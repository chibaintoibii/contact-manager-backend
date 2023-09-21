import { IsString, Length } from "class-validator";

export class CreateUserDto {
  @IsString()
  @Length(1, 255)
  username: string;

  @IsString()
  @Length(1, 1024)
  password: string;
}