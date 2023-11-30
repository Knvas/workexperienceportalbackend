import {NestFactory, Reflector} from '@nestjs/core';
import {AppModule} from './app/app.module';
import {ConfigService} from "@nestjs/config";
import helmet from "helmet";
import {ClassSerializerInterceptor, ValidationPipe} from "@nestjs/common";
import {useContainer} from "class-validator";
import {swaggerDocumentationInit} from "./app/provider/swagger-documentation.provider";
import {ResponseTransformInterceptor} from "./app/interceptor/response-transform.interceptor";
import {HttpExceptionFilter} from "./app/filter/http-exception.filter";

async function bootstrap() {
    const app = await NestFactory.create(AppModule);
    const reflector = app.get(Reflector);

    const configService = app.get(ConfigService);
    const portNumber = +configService.get<number>("PORT");

    app.use(helmet());
    app.enableCors();

    app.useGlobalPipes(new ValidationPipe({transform: true,}));
    app.useGlobalInterceptors(new ClassSerializerInterceptor(reflector));

    app.useGlobalInterceptors(new ResponseTransformInterceptor());
    app.useGlobalFilters(new HttpExceptionFilter());

    useContainer(app.select(AppModule), {fallbackOnErrors: true});

    swaggerDocumentationInit(app);

    await app.listen(portNumber);
}

bootstrap();
