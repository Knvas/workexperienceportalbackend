import {Module} from "@nestjs/common";
import {TypeOrmModule} from "@nestjs/typeorm";
import {AuthenticationEntity} from "./entity/authentication.entity";
import {UserEntity} from "../user/entity/user.entity";
import {JwtModule} from "@nestjs/jwt";
import {ConfigModule, ConfigService} from "@nestjs/config";
import {AuthService} from "./service/auth.service";
import {AuthController} from "./controller/auth.controller";
import {UserModule} from "../user/user.module";

@Module({
    imports: [
        TypeOrmModule.forFeature([
            AuthenticationEntity,
            UserEntity
        ]),
        JwtModule.registerAsync({
            global: true,
            imports: [ConfigModule],
            inject: [ConfigService],
            useFactory: (configService: ConfigService) => ({
                secret: configService.get<string>("jwt_secret"),
                signOptions: {expiresIn: "2y"}
            })
        }),
        UserModule,
    ],
    providers: [AuthService],
    controllers: [AuthController]
})
export class AuthModule {
}