import {TypeOrmModuleOptions} from "@nestjs/typeorm";
import appConfig from "../../app/config/app.config";
import {NodeEnv} from "../../shared/constant/node-env";
import {registerAs} from "@nestjs/config";
import {readFileSync} from "fs";
import {AuthenticationSubscriber} from "../../auth/suscribers/authentication.subscriber";

const config = appConfig();
const dbConfig = config.db;

export const databaseConfigOptions: TypeOrmModuleOptions = {
    type: "postgres",
    database: dbConfig.database,
    host: dbConfig.host,
    port: +dbConfig.port,
    username: dbConfig.user,
    password: dbConfig.password,
    logging: config.node_env === NodeEnv.DEVELOPMENT,
    synchronize: config.node_env === NodeEnv.DEVELOPMENT,
    ssl: config.node_env === NodeEnv.DEVELOPMENT ? false : {
        ca: readFileSync(dbConfig.certificate),
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
