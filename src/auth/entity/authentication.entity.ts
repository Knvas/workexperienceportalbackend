import {BaseEntity} from "../../shared/entity/base.entitiy";
import {Column, Entity, OneToOne} from "typeorm";
import {UserEntity} from "../../user/entity/user.entity";
import {Exclude} from "class-transformer";

export enum UserRole {
    // can perform all operations on
    // all schools
    SUPER_ADMIN = "super_admin",

    // can perform limited operations on
    // student and guardians in school
    SCHOOL_ADMIN = "school_admin",

    // can perform limited operations on wards
    GUARDIAN = "guardian",

    // can perform specific operations on self
    STUDENT = "student"
}

@Entity("authentication")
export class AuthenticationEntity extends BaseEntity {

    @Column({unique: true})
    email: string;

    @Exclude()
    @Column({nullable: true})
    password?: string;

    @Column({
        type: "enum",
        enum: UserRole,
        default: UserRole.STUDENT
    })
    role: UserRole;

    @Column({default: true})
    isActive: boolean;

    @OneToOne(
        () => UserEntity,
        (user) => user.authentication
    )
    user: UserEntity;

}