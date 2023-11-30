import {TypeOrmModuleOptions} from "@nestjs/typeorm";
import {NodeEnv} from "../../shared/constant/node-env";
import {registerAs} from "@nestjs/config";
import {readFileSync} from "fs";
import {AuthenticationSubscriber} from "../../auth/suscribers/authentication.subscriber";
import * as process from "process";
import appConfig from "../../app/config/app.config";

const config = appConfig();

export const databaseConfigOptions: TypeOrmModuleOptions = {
    type: "postgres",
    database: process.env.DB_NAME,
    host: process.env.DB_HOST,
    port: +process.env.DB_PORT,
    username: process.env.DB_USER,
    password: process.env.DB_PASSWORD,
    logging: process.env.NODE_ENV === NodeEnv.DEVELOPMENT,
    synchronize: process.env.NODE_ENV === NodeEnv.DEVELOPMENT,
    ssl: process.env.NODE_ENV === NodeEnv.DEVELOPMENT ? false : {
        ca: readFileSync(process.env.DB_CERTIFICATE || ""),
        rejectUnauthorized: false
    },
    autoLoadEntities: true,
    subscribers: [AuthenticationSubscriber],
    extra: {charset: "utf8mb4_unicode_ci"},
    entities: ["dist/**/*.entity.{ts,js}"],
    migrations: ["dist/migrations/*{.ts,.js}"],
    migrationsTableName: "dyno_migrations",
    migrationsRun: false
};

export const typeOrmConfig = registerAs(
    "typeOrmConfig", () => databaseConfigOptions
);
