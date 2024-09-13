import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { ValidationPipe } from '@nestjs/common';
import { CORS } from './constants/cors';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  app.setGlobalPrefix('api/v1')
  app.useGlobalPipes(new ValidationPipe())
  app.enableCors(CORS)
  await app.listen(3000);
}
bootstrap();
