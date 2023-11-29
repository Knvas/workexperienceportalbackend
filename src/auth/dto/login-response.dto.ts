import {ApiProperty} from "@nestjs/swagger";
import {UserRole} from "../entity/authentication.entity";
import {UserEntity} from "../../user/entity/user.entity";



export class LoginResponseDto {

  @ApiProperty()
  firstName: string;

  @ApiProperty()
  lastName: string;

  @ApiProperty()
  otherNames?: string;

  @ApiProperty()
  email?: string;

  @ApiProperty()
  phoneNumber: string;

  @ApiProperty({ enum: UserRole })
  role: UserRole;

  @ApiProperty()
  hasSetPassword?: boolean;

  @ApiProperty()
  authToken: string | null;

  constructor(partial: Partial<LoginResponseDto>) {
    Object.assign(this, partial);
  }

  static build(user: UserEntity, token: string | null) {
    return new LoginResponseDto({
      firstName: user.firstName,
      lastName: user.lastName,
      otherNames: user.otherNames,
      phoneNumber: user.phoneNumber,
      email: user.authentication?.email,
      role: user.authentication?.role,
      hasSetPassword: !!(user.authentication?.password),
      authToken: token
    });
  }
}