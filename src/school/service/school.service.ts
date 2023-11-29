import {BadRequestException, Injectable, Logger} from "@nestjs/common";
import {Repository} from "typeorm";
import {SchoolEntity} from "../entity/school.entity";
import {InjectRepository} from "@nestjs/typeorm";
import {CreateSchoolDto} from "../dto/create-school.dto";
import {PostgresErrorCode} from "../../storage/constraint/error.constraints";

@Injectable()
export class SchoolService {

    private readonly logger = new Logger(SchoolService.name);

    constructor(
        @InjectRepository(SchoolEntity)
        private readonly schoolRepository: Repository<SchoolEntity>
    ) {
    }

    async createSchool(dto: CreateSchoolDto): Promise<SchoolEntity> {

        try {
            const newSchool = this.schoolRepository.create({
                name: dto?.name,
                email: dto?.email,
                phoneNumber: dto?.phoneNumber,
                address: dto?.address,
                city: dto?.city,
                country: dto?.country,
                postalCode: dto?.postalCode,
            });

            return await this.schoolRepository.save(newSchool);

        } catch (error) {
            this.logger.error(error);

            if (error.code === PostgresErrorCode.UniqueViolation) {
                throw new BadRequestException("School with specified information already exists");
            }

            throw new BadRequestException("Creating school failed");
        }
    }

}