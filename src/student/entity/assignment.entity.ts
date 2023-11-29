import {BaseEntity} from "../../shared/entity/base.entitiy";
import {Column, Entity, JoinColumn, OneToOne} from "typeorm";
import {EmployerInfoEntity} from "./employer-info.entity";
import {MedicalInfoEntity} from "./medical-info.entity";
import {UserEntity} from "../../user/entity/user.entity";
import {ContactInfoEntity} from "./contact-info.entity";

@Entity("assignment")
export class AssignmentEntity extends BaseEntity {

    @OneToOne(() => UserEntity)
    @JoinColumn()
    student: UserEntity

    @OneToOne(
        () => ContactInfoEntity,
        {nullable: true}
    )
    @JoinColumn()
    contactInfo?: ContactInfoEntity;

    @OneToOne(
        () => EmployerInfoEntity,
        {nullable: true}
    )
    @JoinColumn()
    employerInfo?: EmployerInfoEntity;

    @OneToOne(
        () => MedicalInfoEntity,
        {nullable: true}
    )
    @JoinColumn()
    medicalInfo?: MedicalInfoEntity;

    @Column({default: false})
    isSchoolApproved: boolean;

    @Column({default: false})
    isEmployerApproved: boolean;

    @Column({default: false})
    isFormCompleted: boolean;
}