import { HttpException, Injectable } from "@nestjs/common";
import { JwtService } from "@nestjs/jwt";
import * as process from 'process';
import { CreateUserDto } from "../users/dto/create-user.dto";
import { User } from "../users/models/user.model";
import { UsersService } from "../users/users.service";

@Injectable()
export class AuthService {
  constructor(
    private usersService: UsersService,
    private jwtService: JwtService
  ) {}
  async login(dto: CreateUserDto) {
    const user = await this.usersService.findByEmail(dto.email);
    if(!user)
      throw new HttpException('incorrect email or password', 400);
    if(user.password !== dto.password)
      throw new HttpException('incorrect email or password', 400);

    return this._generateTokens(user);
  }

  async register(dto: CreateUserDto) {
    const candidate = await this.usersService.findByEmail(dto.email);
    if(candidate)
      throw new HttpException('this user already exists', 400);

    const user = await this.usersService.createUser(dto);
    return this._generateTokens(user);
  }

  private _generateTokens(user: User) {
    const payload = {id: user.id, email: user.email};
    return {
      accessToken: this.jwtService.sign(payload, { secret: process.env.JWT_ACCESS_TOKEN_SECRET, expiresIn: '1h' }),
      refreshToken: this.jwtService.sign(payload, { secret: process.env.JWT_REFRESH_TOKEN_SECRET, expiresIn: '1h' })
    }
  }

  validateAccessToken(accessToken) {
    try {
      return this.jwtService.verify(accessToken, {
        secret: process.env.JWT_ACCESS_TOKEN_SECRET
      });
    } catch (err) {
      return null;
    }
  }
  validateRefreshToken(refreshToken) {
    try {
      return this.jwtService.verify(refreshToken, {
        secret: process.env.JWT_REFRESH_TOKEN_SECRET
      });
    } catch (err) {
      return null;
    }
  }
}
