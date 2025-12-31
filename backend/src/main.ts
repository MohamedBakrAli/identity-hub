import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { ValidationPipe } from '@nestjs/common';
import cookieParser from 'cookie-parser';

const PORT = process.env.PORT ?? 3000;

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

  await app.listen(PORT);
}

bootstrap()
  .then(() => {
    console.log(`Server is running on port ${PORT}`);
  })
  .catch((error) => {
    console.error('Error starting server', error);
  });
