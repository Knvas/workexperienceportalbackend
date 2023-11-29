import {Column, Entity} from "typeorm";
import {BaseEntity} from "../../shared/entity/base.entitiy";
import {PlacementDays} from "../dto/create-assignment.dto";

export enum PlacementType {
    HYBRID = "hybrid",
    ON_SITE = "on_site",
    VIRTUAL = "virtual"
}

@Entity("employer_info")
export class EmployerInfoEntity extends BaseEntity {

    @Column({nullable: true})
    companyName?: string;

    @Column({nullable: true})
    industry?: string;

    @Column({nullable: true})
    companyPhoneNumber?: string;

    @Column({nullable: true})
    companyEmail?: string;

    @Column({nullable: true})
    companyAddress?: string;

    @Column({nullable: true})
    dressCode?: string;

    @Column({nullable: true})
    role?: string;

    @Column({nullable: true})
    startDate?: Date;

    @Column({nullable: true})
    endDate?: Date;

    @Column({nullable: true})
    startTime?: string;

    @Column({nullable: true})
    endTime?: string;

    @Column({enum: PlacementType})
    placementType?: PlacementType;

    @Column({type: "jsonb", nullable: true})
    placementDays?: PlacementDays;

    @Column({nullable: true})
    insuranceCompanyName ?: string;

    @Column({nullable: true})
    insuranceCertificateUrl?: string;

}