import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { ValidationPipe } from '@nestjs/common';
import { CORS } from './constants/cors';
import { ConfigService } from '@nestjs/config';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  const configService=app.get(ConfigService)
  const PORT=process.env.PORT || configService.get('PORT')
  app.setGlobalPrefix('api/v1')
  app.useGlobalPipes(new ValidationPipe())
  app.enableCors(CORS)
  await app.listen(PORT);
  console.log(`Application running on: ${await app.getUrl()}`);
    
}
bootstrap();
