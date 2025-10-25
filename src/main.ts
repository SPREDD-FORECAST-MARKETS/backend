import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';
import { ValidationPipe } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import * as express from 'express';
import rateLimit from 'express-rate-limit';

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

  // Configure CORS for public API access
  app.enableCors({
    origin: '*', // Allow all origins for public API
    methods: ['GET', 'POST', 'PATCH', 'DELETE', 'OPTIONS'],
    allowedHeaders: ['Content-Type', 'Authorization', 'X-API-Key', 'Cache-Control', 'Accept'],
    credentials: false, // No credentials needed for public API
  });

  // Rate limiting for public API endpoints
  const publicApiLimiter = rateLimit({
    windowMs: 60 * 60 * 1000, // 1 hour
    max: 1000, // Limit each IP to 1000 requests per hour
    message: {
      success: false,
      error: 'Too many requests from this IP, please try again later.',
      retryAfter: '1 hour'
    },
    standardHeaders: true,
    legacyHeaders: false,
  });

  const publicApiBurstLimiter = rateLimit({
    windowMs: 1 * 60 * 1000, // 1 minute
    max: 100, // Limit each IP to 100 requests per minute (burst protection)
    message: {
      success: false,
      error: 'Rate limit exceeded. Maximum 100 requests per minute.',
      retryAfter: '1 minute'
    },
    standardHeaders: true,
    legacyHeaders: false,
  });

  // Apply rate limiting to public API routes
  app.use('/api/v1', publicApiLimiter);
  app.use('/api/v1', publicApiBurstLimiter);

  // Request logging for public API
  app.use('/api/v1', (req, res, next) => {
    const start = Date.now();
    const originalSend = res.send;
    
    res.send = function(data) {
      const duration = Date.now() - start;
      const ip = req.ip || req.connection.remoteAddress;
      const userAgent = req.get('User-Agent') || 'Unknown';
      
      console.log(`[API] ${req.method} ${req.originalUrl} - ${res.statusCode} - ${duration}ms - IP: ${ip} - UA: ${userAgent.substring(0, 100)}`);
      
      return originalSend.call(this, data);
    };
    
    next();
  });

  // Only setup Swagger in development/non-production environments
  const nodeEnv = process.env.NODE_ENV;

  if (nodeEnv !== 'production') {
    const config = new DocumentBuilder()
      .setTitle('Spredd Markets API')
      .setDescription('API for Spredd Markets - Prediction market platform with trading, analytics, and market data endpoints')
      .setVersion('1.0')
      .addBearerAuth()
      .addTag('Public API', 'Public endpoints for external access to market data')
      .addTag('Markets', 'Market creation, resolution and management')
      .addTag('Trading', 'Trading and transaction endpoints')
      .addTag('Users', 'User management and authentication')
      .addTag('Analytics', 'Dashboard and statistics endpoints')
      .build();

    const document = SwaggerModule.createDocument(app, config);
    SwaggerModule.setup('api/docs', app, document);

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
