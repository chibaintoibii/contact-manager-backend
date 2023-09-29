import { IsNumber, IsOptional, IsString, Length, MaxLength, Min } from "class-validator";

export class CreateContactDto {
  @IsString()
  @Length(1, 255)
  name: string;

  @IsString()
  @Length(1, 255)
  phoneNumber: string;

  @IsString()
  @MaxLength(255)
  @IsOptional()
  email: string;

  @IsString()
  @IsOptional()
  imageURL: string;

  @IsNumber()
  @Min(1)
  groupId: number;
}