import {BadRequestException, Body, Controller, Post} from "@nestjs/common";
import {ApiTags} from "@nestjs/swagger";
import {AssignmentService} from "../service/assignment.service";
import {CreateAssignmentDto} from "../dto/create-assignment.dto";
import {PlacementType} from "../entity/employer-info.entity";
import {AssignmentEntity} from "../entity/assignment.entity";

@ApiTags("Assignment")
@Controller("/assignment")
export class AssignmentController {

    constructor(
        private readonly assignmentService: AssignmentService
    ) {
    }

    @Post("/")
    async createAssignment(@Body() dto: CreateAssignmentDto): Promise<AssignmentEntity> {

        const placementType = dto?.employerInfo?.placementType;
        const placementDays = dto?.employerInfo?.placementDays || {};

        return await this.assignmentService.createAssignment(dto);
    }
}