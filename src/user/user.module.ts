import {Module} from "@nestjs/common";
import {UserService} from "./service/user.service";
import {TypeOrmModule} from "@nestjs/typeorm";
import {UserEntity} from "./entity/user.entity";
import {AuthenticationEntity} from "../auth/entity/authentication.entity";
import {UserController} from "./controller/user.controller";

@Module({
    imports: [TypeOrmModule.forFeature([UserEntity, AuthenticationEntity])],
    providers: [UserService],
    controllers: [UserController],
    exports: [UserService]
})
export class UserModule {
}