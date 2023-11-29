import {IsEmail, IsNotEmpty, IsPhoneNumber, IsPostalCode, IsString} from "class-validator";
import {ApiProperty} from "@nestjs/swagger";

export class CreateSchoolDto {

    @ApiProperty()
    @IsNotEmpty()
    @IsString()
    readonly name: string;

    @ApiProperty()
    @IsEmail()
    readonly email: string;

    @ApiProperty()
    @IsPhoneNumber()
    readonly phoneNumber: string;

    @ApiProperty()
    @IsString()
    @IsNotEmpty()
    readonly address: string;

    @ApiProperty()
    @IsString()
    @IsNotEmpty()
    readonly city: string;

    @ApiProperty()
    @IsString()
    @IsNotEmpty()
    readonly country: string;

    @ApiProperty()
    @IsString()
    @IsNotEmpty()
    readonly postalCode: string;
}