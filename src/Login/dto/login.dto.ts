import { Type } from 'class-transformer';
import { IsBoolean, IsEnum, IsNumber, IsOptional, IsString, ValidateNested,IsNotEmpty } from "class-validator";

export class LoginDTO {
    @IsNotEmpty()
    @IsString()
    userId:string;

    @IsNotEmpty()
    @IsString()
    password:string;
  }

export class LoginResponseDTO {
    @IsNotEmpty()
    @IsString()
    isVerified: boolean

    @IsNotEmpty()
    @IsString()
    accessToken: string

    @IsNotEmpty()
    @IsString()
    refreshToken: string
  }