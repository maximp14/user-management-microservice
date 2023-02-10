import {
  IsString,
  IsEmail,
  IsOptional,
  IsNumber,
  IsBoolean,
} from "class-validator";

export class CreateUserDto {
  @IsNumber()
  @IsOptional()
  id: number;

  @IsString()
  name: string;

  @IsString()
  lastName: string;

  @IsString()
  address: string;

  @IsString()
  phoneNumber: string;

  @IsEmail()
  email: string;

  @IsString()
  password: string;

  @IsBoolean()
  @IsOptional()
  isActive?: boolean;

  @IsOptional()
  @IsString()
  profilePicture: string;
}
