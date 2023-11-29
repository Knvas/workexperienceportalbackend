import {Body, Controller, Post, UseGuards} from "@nestjs/common";
import {ApiTags} from "@nestjs/swagger";
import {CreateSchoolDto} from "../dto/create-school.dto";
import {SuperAdminGuard} from "../../auth/guard/super-admin.guard";
import {SchoolService} from "../service/school.service";
import {SchoolEntity} from "../entity/school.entity";

@ApiTags("School")
@Controller("/school")
export class SchoolController {

    constructor(
        private readonly schoolService: SchoolService
    ) {
    }


    @UseGuards(SuperAdminGuard)
    @Post("/")
    async createSchool(@Body() dto: CreateSchoolDto): Promise<SchoolEntity> {
        return this.schoolService.createSchool(dto);
    }
}