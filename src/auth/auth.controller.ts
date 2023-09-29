import { Body, Controller, Post, Res } from '@nestjs/common';
import { Response } from 'express';
import { AuthService } from "./auth.service";
import { CreateUserDto } from "../users/dto/create-user.dto";

@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @Post('login')
  async login(@Res({passthrough: true}) res: Response, @Body() dto: CreateUserDto) {
    const tokens = await this.authService.login(dto);
    res.cookie('refreshToken', tokens.refreshToken, {
      httpOnly: true,
      maxAge: 1000 * 60 * 60 * 24 * 30,
      secure: false
    });
    return tokens;
  }

  @Post('register')
  register(@Body() dto: CreateUserDto) {
    return this.authService.register(dto);
  }
}
