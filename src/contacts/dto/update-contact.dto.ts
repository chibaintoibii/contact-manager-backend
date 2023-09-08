import { IsNumber, IsString, Length, Min } from "class-validator";

export class UpdateContactDto {

  @IsString()
  @Length(1, 255)
  name: string;

  @IsString()
  @Length(1, 255)
  phoneNumber: string;

  @IsString()
  @Length(1, 255)
  email: string;

  @IsString()
  @Length(1, 255)
  imageURL: string;

  @IsNumber()
  @Min(1)
  groupId: number;
}