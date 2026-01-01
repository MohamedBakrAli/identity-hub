import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { ValidationPipe } from '@nestjs/common';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';
import cookieParser from 'cookie-parser';
import { AllExceptionsFilter } from './common/filters/all-exceptions.filter';
import { ResponseInterceptor } from './common/interceptors/response.interceptor';
import { AppConfig } from './config/app.config';
import { WinstonModule } from 'nest-winston';
import { winstonConfig } from './shared/logger/winston.config';
import { AppLogger } from './shared/logger/logger.service';

async function bootstrap() {
  const logger = WinstonModule.createLogger(winstonConfig);
  const app = await NestFactory.create(AppModule, { logger });

  // add validation pipe middleware
  app.useGlobalPipes(
    new ValidationPipe({
      whitelist: true, // remove extra properties
      transform: true, // auto-transform payload to DTO instances
    }),
  );

  // add cookie parser middleware
  app.use(cookieParser());

  // add global response interceptor (wraps responses in { data: ... })
  app.useGlobalInterceptors(new ResponseInterceptor());

  // add global exception filter middleware
  const appLogger = await app.resolve(AppLogger);
  app.useGlobalFilters(new AllExceptionsFilter(appLogger));

  // setup OpenAPI/Swagger documentation (disabled in production)
  if (!AppConfig.isProduction) {
    const config = new DocumentBuilder()
      .setTitle('IdentityHub API')
      .setDescription('Authentication and user management API')
      .setVersion('1.0')
      .addCookieAuth('Authentication')
      .build();
    const document = SwaggerModule.createDocument(app, config);
    SwaggerModule.setup('api', app, document);
  }

  await app.listen(AppConfig.port);
}

bootstrap()
  .then(() => {
    console.log(
      `Server is running on port ${AppConfig.port} in ${AppConfig.nodeEnv} mode`,
    );
  })
  .catch((error) => {
    console.error('Error starting server', error);
  });
