import {Column, Entity, JoinColumn, ManyToOne, OneToOne, RelationId} from "typeorm";
import {BaseEntity} from "../../shared/entity/base.entitiy";
import {AuthenticationEntity} from "../../auth/entity/authentication.entity";
import {SchoolEntity} from "../../school/entity/school.entity";
import {Exclude} from "class-transformer";

export enum Gender {
    MALE = "male",
    FEMALE = "female",
}

@Entity("user")
export class UserEntity extends BaseEntity {

    @Column()
    firstName: string;

    @Column()
    lastName: string;

    @Column({nullable: true})
    otherNames?: string;

    @Column({type: "enum", enum: Gender})
    gender: Gender;

    @Column()
    dateOfBirth: Date;

    @Column()
    phoneNumber: string;

    @Column({nullable: true})
    profileUrl?: string;

    @Exclude()
    @ManyToOne(
        () => SchoolEntity,
        (school) => school.users,
        {nullable: true}
    )
    school?: SchoolEntity;

    @Exclude()
    @OneToOne(
        () => AuthenticationEntity,
        (auth) => auth.user,
        {eager: true, onDelete: "CASCADE"}
    )
    @JoinColumn()
    authentication: AuthenticationEntity;

    // relation id properties

    @RelationId((user: UserEntity) => user.school)
    schoolId?: string;
}