import {Module} from "@nestjs/common";
import {StudentController} from "./controller/student.controller";
import {AssignmentController} from "./controller/assignment.controller";
import {AssignmentService} from "./service/assignment.service";
import {TypeOrmModule} from "@nestjs/typeorm";
import {AssignmentEntity} from "./entity/assignment.entity";
import {ContactInfoEntity} from "./entity/contact-info.entity";
import {EmployerInfoEntity} from "./entity/employer-info.entity";
import {MedicalInfoEntity} from "./entity/medical-info.entity";

@Module({
    imports: [
        TypeOrmModule.forFeature([
            AssignmentEntity,
            ContactInfoEntity,
            EmployerInfoEntity,
            MedicalInfoEntity,
        ])
    ],
    providers: [
        AssignmentService
    ],
    controllers: [
        StudentController,
        AssignmentController,
    ],
})
export class StudentModule {
}