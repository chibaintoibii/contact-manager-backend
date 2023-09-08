import { IsString, Length } from "class-validator";

export class UpdateGroupDto {
  @IsString()
  @Length(3, 255)
  name: string;
}