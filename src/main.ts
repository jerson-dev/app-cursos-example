import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { ValidationPipe, VersioningType } from '@nestjs/common';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';
import { json } from 'express';

async function bootstrap() {
  const app = await NestFactory.create(AppModule, {
    cors:true
  });

  app.enableVersioning({
    defaultVersion: '1',
    type: VersioningType.URI,
  });

  app.use(json({ limit: '60mb' }))
  const config = new DocumentBuilder()
    .addBearerAuth()
    .setTitle('API NestJS Curso')
    .setDescription('Esta es la api del curso de NestJS de codigoencasa.com')
    .addTag('courses')
    .addTag('videos')
    .addTag('awards')
    .addTag('auth')
    .build();

  const document = SwaggerModule.createDocument(app, config);
  SwaggerModule.setup('documentation', app, document);
  console.log('__ENV__', process.env.PORT)
  app.useGlobalPipes(new ValidationPipe)
  await app.listen(3000);
}
bootstrap();
