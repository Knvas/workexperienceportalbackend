import { TypeOrmModuleOptions } from "@nestjs/typeorm";
import { DataSource, DataSourceOptions } from "typeorm";
import { databaseConfigOptions } from "./db.config";


const configOptions: TypeOrmModuleOptions = {
  ...databaseConfigOptions,
  entities: ["dist/**/*.entity{.ts,.js}"],
  migrations: ["dist/migrations/**/*{.ts,.js}"],
  migrationsTableName: "knvas_migrations",
  migrationsRun: false
};

export default new DataSource(configOptions as DataSourceOptions);