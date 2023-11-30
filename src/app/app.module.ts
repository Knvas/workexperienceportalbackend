import {Module} from '@nestjs/common';
import {AppController} from './controller/app.controller';
import {AppService} from './service/app.service';
import {StorageModule} from "../storage/storage.module";
import {ConfigModule} from "@nestjs/config";
import appConfig from "./config/app.config";
import {typeOrmConfig} from "../storage/config/db.config";
import {AuthModule} from "../auth/auth.module";
import {UserModule} from "../user/user.module";
import {SchoolModule} from "../school/school.module";
import {StudentModule} from "../student/student.module";
import * as Joi from "joi";
import {NodeEnv} from "../shared/constant/node-env";

@Module({
    imports: [
        ConfigModule.forRoot({
            cache: true,
            isGlobal: true,
            envFilePath: [".env"],
            load: [appConfig, typeOrmConfig],
            validationSchema: Joi.object({
                PORT: Joi.number().required(),
                NODE_ENV: Joi.string()
                    .valid(NodeEnv.DEVELOPMENT, NodeEnv.PRODUCTION)
                    .required(),
                // database validate
                DB_NAME: Joi.string().required(),
                DB_HOST: Joi.string().required(),
                DB_PORT: Joi.number().required(),
                DB_USER: Joi.string().required(),
                DB_PASSWORD: Joi.string().required(),
                DB_CERTIFICATE: Joi.string().required(),
                // s3 bucket
                STORAGE_BUCKET_KEY: Joi.string().required(),
                STORAGE_BUCKET_SECRET: Joi.string().required(),
                STORAGE_BUCKET_ENDPOINT: Joi.string().required(),
                STORAGE_BUCKET_CDN_ENDPOINT: Joi.string().required(),
                // JWT
                JWT_SECRET: Joi.string().required()
            }),
        }),
        StorageModule,
        AuthModule,
        UserModule,
        SchoolModule,
        StudentModule,
    ],
    controllers: [AppController],
    providers: [AppService],
})
export class AppModule {
}
