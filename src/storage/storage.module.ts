import {Module} from "@nestjs/common";
import {TypeOrmModule} from "@nestjs/typeorm";
import {ConfigModule, ConfigService} from "@nestjs/config";
import {FileStorageService} from "./service/file-storage.service";
import {DoFileStorageService} from "./service/do-file-storage.service";

@Module({
    imports: [
        TypeOrmModule.forRootAsync({
            imports: [ConfigModule],
            inject: [ConfigService],
            useFactory: (configService: ConfigService) => {
                return configService.get("typeOrmConfig");
            }
        }),
    ],
    providers: [
        {
            provide: FileStorageService,
            useClass: DoFileStorageService
        }
    ],
    exports: [FileStorageService]
})
export class StorageModule {
}