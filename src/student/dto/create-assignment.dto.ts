import {ApiProperty} from "@nestjs/swagger";
import {
    IsEmail,
    IsNotEmpty,
    IsOptional,
    IsPhoneNumber,
    IsString,
    IsUUID,
    MinDate,
    ValidateNested,
    IsEnum, MaxDate,
} from "class-validator";
import {Transform, Type} from "class-transformer";
import {IsHHmmAA} from "../../shared/validator/hhmm.validator";
import {IsNullable} from "../../shared/validator/is-nullable.validator";
import {Gender} from "../../user/entity/user.entity";
import {PlacementType} from "../entity/employer-info.entity";

export class MedicalInfoDto {

    @IsString({each: true})
    @IsNotEmpty({each: true})
    @ApiProperty()
    conditions: string[];

    @IsString({each: true})
    @IsNotEmpty({each: true})
    @ApiProperty()
    specialEducationNeeds: string[];

}

export enum PlacementTypeDto {

    HYBRID = "hybrid",

    ON_SITE = "on_site",

    VIRTUAL = "virtual"
}

export class PlacementDays {

    @IsEnum(PlacementTypeDto)
    @ApiProperty({enum: PlacementTypeDto})
    monday: PlacementTypeDto;

    @IsEnum(PlacementTypeDto)
    @ApiProperty({enum: PlacementTypeDto})
    tuesday: PlacementTypeDto;

    @IsEnum(PlacementTypeDto)
    @ApiProperty({enum: PlacementTypeDto})
    wednesday: PlacementTypeDto;

    @IsEnum(PlacementTypeDto)
    @ApiProperty({enum: PlacementType})
    thursday: PlacementTypeDto;

    @IsEnum(PlacementTypeDto)
    @ApiProperty({enum: PlacementTypeDto})
    friday: PlacementTypeDto;
}

export class EmployerInfoDto {

    @IsString()
    @IsNotEmpty()
    @ApiProperty()
    companyName?: string;

    @IsString()
    @IsNotEmpty()
    @ApiProperty()
    industry?: string;

    @IsEmail()
    @ApiProperty()
    companyEmail?: string;

    @IsPhoneNumber()
    @ApiProperty()
    companyPhoneNumber?: string;

    @IsString()
    @IsNotEmpty()
    @ApiProperty()
    companyAddress?: string;

    // @IsEnum(PlacementType)
    @ApiProperty({enum: PlacementType})
    placementType: PlacementType;

    @ValidateNested()
    @Type(() => PlacementDays)
    @ApiProperty()
    placementDays: PlacementDays;

    @IsString()
    @ApiProperty()
    role?: string;

    @IsString()
    @IsNotEmpty()
    @ApiProperty()
    dressCode?: string;

    @Transform(({value}) => new Date(value))
    @MinDate(new Date())
    @ApiProperty({description: "date in the format of yyyy-mm-dd"})
    readonly startDate?: Date;

    @Transform(({value}) => new Date(value))
    @MinDate(new Date())
    @ApiProperty({description: "date in the format of yyyy-mm-dd"})
    readonly endDate?: Date;

    @IsHHmmAA()
    @ApiProperty({description: "time in the format of HH:mm aa"})
    readonly startTime?: string;

    @IsHHmmAA()
    @IsNullable()
    @ApiProperty({description: "time in the format of HH:mm aa"})
    readonly endTime?: string;

    @IsString()
    @IsNullable()
    @ApiProperty()
    insuranceCompanyName?: string;

}

export class ContactInfoDto {

    @IsString()
    @IsNotEmpty()
    @ApiProperty()
    guardianFirstName: string;

    @IsString()
    @IsNotEmpty()
    @ApiProperty()
    guardianLastName: string;

    @IsString()
    @IsOptional()
    @ApiProperty()
    guardianOtherNames?: string;

    @IsNotEmpty()
    @IsEnum(Gender)
    @ApiProperty({enum: Gender})
    guardianGender: Gender;

    @Transform(({value}) => new Date(value))
    @MaxDate(new Date())
    @ApiProperty({description: "date in the format of yyyy-mm-dd"})
    guardianDateOfBirth: Date;

    @IsPhoneNumber()
    @ApiProperty()
    guardianPhoneNumber: string;

    @IsString()
    @IsNullable()
    @ApiProperty()
    tutorGroup: string;

}

export class CreateAssignmentDto {

    @IsUUID()
    @ApiProperty()
    studentUserId: string;

    @ValidateNested()
    @Type(() => ContactInfoDto)
    @ApiProperty()
    contactInfo: ContactInfoDto;

    @ValidateNested()
    @Type(() => EmployerInfoDto)
    @ApiProperty()
    employerInfo?: EmployerInfoDto;

    @IsNullable()
    @ValidateNested()
    @Type(() => MedicalInfoDto)
    @ApiProperty()
    medicalInfo?: MedicalInfoDto;

}