import {BadRequestException, Injectable, Logger, NotFoundException} from "@nestjs/common";
import {UserEntity} from "../entity/user.entity";
import {DataSource, Repository} from "typeorm";
import {InjectRepository} from "@nestjs/typeorm";
import {AuthenticationEntity, UserRole} from "../../auth/entity/authentication.entity";
import {PostgresErrorCode} from "../../storage/constraint/error.constraints";
import {CreateSchoolUserDto, CreateStudentUserDto} from "../dto/create-user.dto";

@Injectable()
export class UserService {

    private readonly logger = new Logger(UserService.name);

    constructor(
        private readonly dataSource: DataSource,
        @InjectRepository(UserEntity)
        private readonly userRepository: Repository<UserEntity>,
        @InjectRepository(AuthenticationEntity)
        private readonly authRepository: Repository<AuthenticationEntity>
    ) {
    }

    // async createUser(
    //     dto: CreateUserDto,
    //     schoolId: string | null = null,
    //     role: UserRole = UserRole.STUDENT,
    // ): Promise<UserEntity> {
    //
    //     let userEntity: UserEntity;
    //
    //     const queryRunner = this.dataSource.createQueryRunner();
    //
    //     await queryRunner.connect();
    //     await queryRunner.startTransaction();
    //
    //     try {
    //         const newAuth = this.authRepository.create({
    //             email: dto.email,
    //             role: role,
    //         });
    //
    //         const authentication = await queryRunner.manager.save(newAuth);
    //
    //         const newUser = this.userRepository.create({
    //             firstName: dto.firstName,
    //             otherNames: dto.otherNames,
    //             lastName: dto.lastName,
    //             gender: dto.gender,
    //             dateOfBirth: dto.dateOfBirth,
    //             phoneNumber: dto.phoneNumber,
    //             authentication: authentication,
    //             school: (!!schoolId) ? {id: schoolId} : null,
    //         });
    //
    //         userEntity = await queryRunner.manager.save(newUser);
    //
    //         await queryRunner.commitTransaction();
    //     } catch (error) {
    //         await queryRunner.rollbackTransaction();
    //         this.logger.error(error);
    //
    //         if (error.code === PostgresErrorCode.UniqueViolation) {
    //             throw new BadRequestException("User with email already exist");
    //         }
    //
    //         throw new BadRequestException("Failed to create user");
    //     } finally {
    //         await queryRunner.release();
    //     }
    //
    //     return userEntity;
    // }

    async createStudentUser(dto: CreateSchoolUserDto): Promise<UserEntity> {
        let studentUserEntity: UserEntity;

        const queryRunner = this.dataSource.createQueryRunner();

        await queryRunner.connect();
        await queryRunner.startTransaction();

        try {
            const studentAuth = this.authRepository.create({
                email: dto.email,
                role: UserRole.STUDENT,
            });

            const savedStudentAuth = await queryRunner.manager.save(studentAuth);

            const studentUser = this.userRepository.create({
                firstName: dto.firstName,
                otherNames: dto.otherNames,
                lastName: dto.lastName,
                gender: dto.gender,
                dateOfBirth: dto.dateOfBirth,
                phoneNumber: dto.phoneNumber,
                authentication: savedStudentAuth,
                school: (!!(dto?.schoolId)) ? {id: dto?.schoolId} : null,
            });

            studentUserEntity = await queryRunner.manager.save(studentUser);

            await queryRunner.commitTransaction();
        } catch (error) {
            await queryRunner.rollbackTransaction();
            this.logger.error(error);

            if (error.code === PostgresErrorCode.UniqueViolation) {
                throw new BadRequestException("User with email already exist");
            }

            throw new BadRequestException("Failed to create user");
        } finally {
            await queryRunner.release();
        }

        return studentUserEntity;
    }

    async createSchoolAdminUser(dto: CreateSchoolUserDto): Promise<UserEntity> {
        let userEntity: UserEntity;

        const queryRunner = this.dataSource.createQueryRunner();

        await queryRunner.connect();
        await queryRunner.startTransaction();

        try {
            const newAuth = this.authRepository.create({
                email: dto.email,
                role: UserRole.SCHOOL_ADMIN,
            });

            const authentication = await queryRunner.manager.save(newAuth);

            const newUser = this.userRepository.create({
                firstName: dto.firstName,
                otherNames: dto.otherNames,
                lastName: dto.lastName,
                gender: dto.gender,
                dateOfBirth: dto.dateOfBirth,
                phoneNumber: dto.phoneNumber,
                authentication: authentication,
                school: (!!(dto?.schoolId)) ? {id: dto?.schoolId} : null,
            });

            userEntity = await queryRunner.manager.save(newUser);

            await queryRunner.commitTransaction();
        } catch (error) {
            await queryRunner.rollbackTransaction();
            this.logger.error(error);

            if (error.code === PostgresErrorCode.UniqueViolation) {
                throw new BadRequestException("User with email already exist");
            }

            throw new BadRequestException("Failed to create user");
        } finally {
            await queryRunner.release();
        }

        return userEntity;
    }

    async getUserById(id: string): Promise<UserEntity> {

        const userEntity = await this.userRepository.findOne({
            where: {id: id}
        });

        if (!userEntity) {
            throw new NotFoundException(`User with id ${id} not found`);
        }

        return userEntity;
    }

    async getUserByEmail(email: string): Promise<UserEntity> {

        const userEntity = await this.userRepository.findOne({
            where: {authentication: {email: email}}
        });

        if (!userEntity) {
            throw new NotFoundException(`User with email ${email} not found`);
        }

        return userEntity;
    }
}