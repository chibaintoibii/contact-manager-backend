import { IsEmail, IsString, Length } from 'class-validator';

export class CreateUserDto {
  @IsString()
  @Length(6, 30)
  @IsEmail()
  email: string;

  @IsString()
  @Length(6, 100)
  password: string;
}