import {BadRequestException, Injectable, Logger} from "@nestjs/common";
import {CreateAssignmentDto} from "../dto/create-assignment.dto";
import {AssignmentEntity} from "../entity/assignment.entity";
import {DataSource, Repository} from "typeorm";
import {InjectRepository} from "@nestjs/typeorm";
import {EmployerInfoEntity} from "../entity/employer-info.entity";
import {MedicalInfoEntity} from "../entity/medical-info.entity";
import {ContactInfoEntity} from "../entity/contact-info.entity";

@Injectable()
export class AssignmentService {

    private readonly logger = new Logger(AssignmentService.name);

    constructor(
        private readonly dataSource: DataSource,
        @InjectRepository(AssignmentEntity)
        private readonly assignmentRepository: Repository<AssignmentEntity>,
        @InjectRepository(ContactInfoEntity)
        private readonly contactInfoRepository: Repository<ContactInfoEntity>,
        @InjectRepository(EmployerInfoEntity)
        private readonly employerInfoRepository: Repository<EmployerInfoEntity>,
        @InjectRepository(MedicalInfoEntity)
        private readonly medicalInfoEntityRepository: Repository<MedicalInfoEntity>
    ) {
    }

    async createAssignment(dto: CreateAssignmentDto): Promise<AssignmentEntity> {
        let assignmentEntity: AssignmentEntity;
        let contactInfoEntity: ContactInfoEntity;
        let medicalInfoEntity: MedicalInfoEntity;
        let employerInfoEntity: EmployerInfoEntity;

        const queryRunner = this.dataSource.createQueryRunner();

        await queryRunner.connect();
        await queryRunner.startTransaction();

        const existingIncompleteAssignment = await this.assignmentRepository.findOneBy({
            student: {id: dto?.studentUserId},
            isFormCompleted: false,
        });

        if (existingIncompleteAssignment) {
            throw new BadRequestException("Specified student has an existing incomplete assignment");
        }

        try {
            const newEmployerInfo = this.employerInfoRepository.create({
                companyName: dto?.employerInfo?.companyName,
                industry: dto?.employerInfo?.industry,
                companyPhoneNumber: dto?.employerInfo?.companyPhoneNumber,
                companyEmail: dto?.employerInfo?.companyEmail,
                companyAddress: dto?.employerInfo?.companyAddress,
                dressCode: dto?.employerInfo?.dressCode,
                role: dto?.employerInfo?.role,
                startDate: dto?.employerInfo?.startDate,
                endDate: dto?.employerInfo?.endDate,
                startTime: dto?.employerInfo?.startTime,
                endTime: dto?.employerInfo?.endTime,
                placementType: dto?.employerInfo?.placementType,
                placementDays: dto?.employerInfo?.placementDays,
                insuranceCompanyName: dto?.employerInfo?.insuranceCompanyName
            });

            const newContactInfo = this.contactInfoRepository.create({
                guardianFirstName: dto?.contactInfo?.guardianFirstName,
                guardianLastName: dto?.contactInfo?.guardianLastName,
                guardianOtherNames: dto?.contactInfo?.guardianOtherNames,
                guardianGender: dto?.contactInfo?.guardianGender,
                guardianDateOfBirth: dto?.contactInfo?.guardianDateOfBirth,
                guardianPhoneNumber: dto?.contactInfo?.guardianPhoneNumber,
                tutorGroup: dto?.contactInfo?.tutorGroup,
            });

            const newMedicalInfo = this.medicalInfoEntityRepository.create({
                conditions: dto?.medicalInfo?.conditions || [],
                specialEducationNeeds: dto?.medicalInfo?.specialEducationNeeds || [],
            });

            contactInfoEntity = await queryRunner.manager.save(newContactInfo);
            medicalInfoEntity = await queryRunner.manager.save(newMedicalInfo);
            employerInfoEntity = await queryRunner.manager.save(newEmployerInfo);

            const newAssignment = this.assignmentRepository.create({
                student: {id: dto.studentUserId},
                contactInfo: contactInfoEntity,
                medicalInfo: medicalInfoEntity,
                employerInfo: employerInfoEntity
            });

            assignmentEntity = await queryRunner.manager.save(newAssignment);

            await queryRunner.commitTransaction()
        } catch (error) {
            this.logger.error(error);

            throw new BadRequestException("Error failed to create student assignment");

        } finally {
            await queryRunner.release()
        }

        return assignmentEntity;
    }
}