import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { ValidationPipe } from '@nestjs/common';
import cookieParser from 'cookie-parser';
import { AllExceptionsFilter } from './common/filters/all-exceptions.filter';
import { AppConfig } from './config/app.config';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  // add validation pipe middleware
  app.useGlobalPipes(
    new ValidationPipe({
      whitelist: true, // remove extra properties
      transform: true, // auto-transform payload to DTO instances
    }),
  );

  // add cookie parser middleware
  app.use(cookieParser());

  // add global exception filter middleware
  app.useGlobalFilters(new AllExceptionsFilter());

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
