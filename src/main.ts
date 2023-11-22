import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { ValidationPipe } from '@nestjs/common';
import { SwaggerModule, DocumentBuilder } from '@nestjs/swagger';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  app.useGlobalPipes(new ValidationPipe({
    transform: true,
    forbidNonWhitelisted: true
  }))

  const config = new DocumentBuilder()
    .setTitle('SisEdService')
    .setDescription('SisEdService API')
    .setVersion('1.0')
    .addTag('sisedservice')
    .build();
  const document = SwaggerModule.createDocument(app, config);
  SwaggerModule.setup('api', app, document);

  app.enableCors();
  await app.listen(9000);
}
bootstrap();
