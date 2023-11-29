import {Module} from "@nestjs/common";
import {TypeOrmModule} from "@nestjs/typeorm";
import {SchoolController} from "./controller/school.controller";
import {SchoolService} from "./service/school.service";
import {SchoolEntity} from "./entity/school.entity";
import {UserModule} from "../user/user.module";

@Module({
    imports: [
        TypeOrmModule.forFeature([SchoolEntity]),
        UserModule,
    ],
    providers: [SchoolService],
    controllers: [SchoolController],
})
export class SchoolModule {
}