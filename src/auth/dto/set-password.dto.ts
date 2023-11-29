import { IsString, MinLength } from "class-validator";
import { ApiProperty } from "@nestjs/swagger";

export class SetPasswordDto {

  @ApiProperty()
  @MinLength(6)
  @IsString()
  readonly password: string;

  @ApiProperty()
  @IsString()
  @MinLength(6)
  readonly confirmPassword: string;

}