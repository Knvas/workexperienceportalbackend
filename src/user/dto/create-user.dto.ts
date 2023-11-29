import {
    IsEmail,
    IsEnum,
    IsNotEmpty, IsObject,
    IsOptional,
    IsPhoneNumber,
    IsString,
    IsUUID,
    MaxDate,
    MinDate
} from "class-validator";
import {ApiProperty} from "@nestjs/swagger";
import {Gender} from "../entity/user.entity";
import {Transform} from "class-transformer";
import {UserRole} from "../../auth/entity/authentication.entity";
import {IsNullable} from "../../shared/validator/is-nullable.validator";

export class CreateUserDto {

    @IsString()
    @IsNotEmpty()
    @ApiProperty()
    readonly firstName: string;

    @IsString()
    @IsNotEmpty()
    @ApiProperty()
    readonly lastName: string;

    @IsString()
    @IsOptional()
    @ApiProperty()
    readonly otherNames?: string;

    @IsNotEmpty()
    @IsEnum(Gender)
    @ApiProperty({enum: Gender})
    readonly gender: Gender;

    @Transform(({value}) => new Date(value))
    @MaxDate(new Date())
    @MinDate(new Date("1940-01-01T00:00:00.000Z"))
    @ApiProperty({description: "date in the format of yyyy-mm-dd"})
    readonly dateOfBirth: Date;

    @IsNotEmpty()
    @IsPhoneNumber()
    @ApiProperty()
    readonly phoneNumber: string;

    @IsNotEmpty()
    @IsEmail()
    @ApiProperty()
    readonly email: string;
}

export class CreateSchoolUserDto extends CreateUserDto {

    @IsUUID()
    @IsNullable()
    @ApiProperty({nullable: true})
    schoolId?: string;

    @IsString()
    @IsNullable()
    @ApiProperty({nullable: true})
    yearGroup?: string;

}

export class CreateStudentUserDto {

    @IsObject({always: true})
    @ApiProperty()
    student: CreateSchoolUserDto;

    @ApiProperty()
    @IsObject({always: true})
    guardian: CreateUserDto
}