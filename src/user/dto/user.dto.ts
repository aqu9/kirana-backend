import { IsEmail, IsNotEmpty, IsString, Length } from "class-validator";

export class UserDto{

    @IsNotEmpty()
    @IsString()
    name: string;

    @IsEmail()
    @IsNotEmpty()
    @IsString()
    email:string;

    @IsNotEmpty()
    @IsString()
    @Length(10,10)
    phone: string;

    @IsNotEmpty()
    @IsString()
    password: string;

    @IsString()
    dob?: string;
    
    @IsNotEmpty()
    @IsString()
    address: string;

    @IsNotEmpty()
    @IsString()
    alias: string;
}