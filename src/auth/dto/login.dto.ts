import { ApiProperty } from "@nestjs/swagger";
import { IsEmail, IsNotEmpty, IsString } from "class-validator";

export class EmailLoginDto {

  @ApiProperty()
  @IsEmail()
  readonly email: string;

  @ApiProperty()
  @IsNotEmpty()
  @IsString()
  readonly password: string;

}


export class TokenLoginDto {

  @ApiProperty()
  @IsString()
  @IsNotEmpty()
  token: string;

}