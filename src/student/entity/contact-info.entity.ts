import {Column, Entity} from "typeorm";
import {BaseEntity} from "../../shared/entity/base.entitiy";
import {Gender} from "../../user/entity/user.entity";

@Entity("contact")
export class ContactInfoEntity extends BaseEntity {

    @Column()
    guardianFirstName: string;

    @Column()
    guardianLastName: string;

    @Column({nullable: true})
    guardianOtherNames?: string;

    @Column({type: "enum", enum: Gender})
    guardianGender: Gender;

    @Column()
    guardianDateOfBirth: Date;

    @Column()
    guardianPhoneNumber: string;

    @Column()
    tutorGroup: string
}