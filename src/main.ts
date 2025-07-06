import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';
import { ValidationPipe } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import * as express from 'express';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  const configService = app.get(ConfigService);

  app.use(express.json({ limit: '50mb' }));
  app.use(express.urlencoded({ extended: true, limit: '50mb' }));
  app.useGlobalPipes(new ValidationPipe());

  app.useGlobalPipes(
    new ValidationPipe({
      whitelist: true,
      forbidNonWhitelisted: true,
      transform: true,
    }),
  );

  app.enableCors();

  // Only setup Swagger in development/non-production environments
  const nodeEnv = process.env.NODE_ENV;
  
  if (nodeEnv !== 'production') {
    const config = new DocumentBuilder()
      .setTitle('Shilltube Backend API service')
      .setDescription('API for the Shilltube API Service')
      .setVersion('1.0')
      .addBearerAuth()
      .build();

    const document = SwaggerModule.createDocument(app, config);
    SwaggerModule.setup("api/docs", app, document);
    
    console.log('📚 Swagger documentation available at /api/docs');
  } else {
    console.log('🔒 Swagger documentation disabled in production mode');
  }
  
  const port = configService.get<number>('PORT', 3000);

  await app.listen(process.env.PORT ?? 3000);
  console.log(`Spreadd forecast Backend is running on: ${await app.getUrl()}`);
  console.log(`Environment: ${nodeEnv}`);
}

bootstrap();