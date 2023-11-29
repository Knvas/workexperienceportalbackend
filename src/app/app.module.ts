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

@Module({
    imports: [
        ConfigModule.forRoot({
            cache: true,
            isGlobal: true,
            load: [appConfig, typeOrmConfig]
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
