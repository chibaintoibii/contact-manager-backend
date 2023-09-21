import { Module } from '@nestjs/common';
import { JwtModule } from "@nestjs/jwt";
import { AuthController } from './auth.controller';
import { AuthService } from './auth.service';
import { UsersModule } from "../users/users.module";

@Module({
  controllers: [AuthController],
  providers: [AuthService],
  imports: [JwtModule, UsersModule]
})
export class AuthModule {}
