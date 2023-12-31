import { Module } from '@nestjs/common';
import { UsersService } from './users.service';
import { UsersController } from './users.controller';
import { SequelizeModule } from "@nestjs/sequelize";
import { User } from "./models/user.model";
@Module({
  providers: [UsersService],
  controllers: [UsersController],
  exports: [UsersService],
  imports: [SequelizeModule.forFeature([User])],
})
export class UsersModule {}
