import {BaseEntity} from "../../shared/entity/base.entitiy";
import {Column, Entity} from "typeorm";

@Entity("medical_info")
export class MedicalInfoEntity extends BaseEntity {

    @Column({type: "jsonb"})
    conditions: string[];

    @Column({type: "jsonb"})
    specialEducationNeeds: string[];

}