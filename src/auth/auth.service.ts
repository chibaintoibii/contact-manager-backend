import { HttpException, Injectable } from "@nestjs/common";
import { CreateUserDto } from "../users/dto/create-user.dto";
import { User } from "../users/models/user.model";
import { UsersService } from "../users/users.service";
import { JwtService } from "@nestjs/jwt";

@Injectable()
export class AuthService {
  constructor(private usersService: UsersService,
              private jwtService: JwtService) {
  }
  async login(dto: CreateUserDto) {
    const user = await this.usersService.findByUsername(dto.username);
    if(!user)
      throw new HttpException('incorrect username or password', 400);
    if(user.password !== dto.password)
      throw new HttpException('incorrect username or password', 400);

    return this._generateAccessToken(user);
  }

  async register(dto: CreateUserDto) {
    const candidate = await this.usersService.findByUsername(dto.username);
    if(candidate)
      throw new HttpException('this user already exists', 400);

    const user = await this.usersService.createUser(dto);
    return this._generateAccessToken(user);
  }

  private _generateAccessToken(user: User) {
    const payload = {id: user.id, username: user.username};
    return { token: this.jwtService.sign(payload, {
      secret: 'my-secret-key'
      })
    }
  }
}
