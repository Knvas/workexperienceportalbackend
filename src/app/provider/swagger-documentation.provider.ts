import { INestApplication } from "@nestjs/common";
import { DocumentBuilder, SwaggerModule } from "@nestjs/swagger";

export function swaggerDocumentationInit(app: INestApplication): void {
  const config = new DocumentBuilder()
    .setTitle('Dyno Menu API Documentation')
    .setDescription('API documentation for Dyno Menu')
    .setVersion('1.0')
    .build();

  const document = SwaggerModule.createDocument(app, config);
  SwaggerModule.setup('/', app, document);
}