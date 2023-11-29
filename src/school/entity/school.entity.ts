import {BaseEntity} from "../../shared/entity/base.entitiy";
import {Column, Entity, JoinColumn, ManyToOne, OneToMany, OneToOne} from "typeorm";
import {UserEntity} from "../../user/entity/user.entity";

@Entity("school")
export class SchoolEntity extends BaseEntity {

    @Column()
    name: string;

    @Column({unique: true})
    email: string;

    @Column()
    phoneNumber: string;

    @Column()
    address: string;

    @Column()
    city: string;

    @Column()
    country: string;

    @Column()
    postalCode: string;

    @OneToOne(() => UserEntity)
    @JoinColumn()
    supervisor: UserEntity;

    @OneToMany(
        () => UserEntity,
        (user) => user.school
    )
    users: UserEntity[]
}