import { Injectable } from '@nestjs/common';
import { User } from "./models/user.model";
import { CreateUserDto } from "./dto/create-user.dto";
import { InjectModel } from "@nestjs/sequelize";

@Injectable()
export class UsersService {
  constructor(@InjectModel(User) private readonly usersRepository: typeof User) {}

  async createUser(dto: CreateUserDto) {
    return this.usersRepository.create(dto);
  }

  async findByUsername(username: string) {
    return this.usersRepository.findOne({ where: { username } });
  }
}
