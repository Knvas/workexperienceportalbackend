import {Body, Controller, Post, UseGuards} from "@nestjs/common";
import {CreateSchoolUserDto, CreateStudentUserDto} from "../dto/create-user.dto";
import {UserService} from "../service/user.service";
import {SchoolOrSuperAdminGuard} from "../../auth/guard/school-or-super-admin.guard";
import {ApiOperation, ApiTags} from "@nestjs/swagger";
import {UserEntity} from "../entity/user.entity";
import {SuperAdminGuard} from "../../auth/guard/super-admin.guard";

@ApiTags("User")
@Controller("/user")
export class UserController {


    constructor(
        private readonly userService: UserService
    ) {
    }


    @ApiOperation({summary: "Create Student accounts"})
    @UseGuards(SchoolOrSuperAdminGuard)
    @Post("/student")
    async createStudent(@Body() dto: CreateSchoolUserDto): Promise<UserEntity> {
        return await this.userService.createStudentUser(dto);
    }

    @ApiOperation({summary: "Create School admin account"})
    @UseGuards(SuperAdminGuard)
    @Post("/school-admin")
    async createUserAdmin(@Body() dto: CreateSchoolUserDto): Promise<UserEntity> {
        return await this.userService.createSchoolAdminUser(dto);
    }
}