import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { ConsoleLogger } from '@nestjs/common';
import { NestExpressApplication } from '@nestjs/platform-express';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';

async function bootstrap() {
  const logger = new ConsoleLogger({
    prefix: 'clob-poc-matching-engine',
    logLevels: process.env.LOG_LEVEL === 'debug' ? ['debug'] : ['log'],
  });

  const app = await NestFactory.create<NestExpressApplication>(AppModule, {
    logger,
  });

  app.enableCors();
  const config = new DocumentBuilder()
    .setTitle('PayNeu API')
    .setVersion('0.1')
    .build();
  const documentFactory = () => SwaggerModule.createDocument(app, config);
  SwaggerModule.setup('doc', app, documentFactory);

  await app.listen(process.env.PORT ?? 3000);
}
bootstrap();
