import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { envs, RpcCustomExceptionFilter } from './config';
import { Logger, ValidationPipe } from '@nestjs/common';
import { GlobalRpcExceptionsFilter } from './common/exceptions/rpc-exceptions.filter';

async function bootstrap() {
  const logger = new Logger('Main-Gateway');
  const app = await NestFactory.create(AppModule);

  app.enableCors({
    origin: 'http://localhost:3002',
    methods: 'GET,HEAD,PUT,PATCH,POST,DELETE,OPTIONS',
    allowedHeaders: 'Content-Type, Authorization',
    credentials: true,
  });
  app.setGlobalPrefix('api');

  app.useGlobalPipes(
    new ValidationPipe({
      whitelist: true,
      forbidNonWhitelisted: false,
      transform: true,
    }),
  );
  app.useGlobalFilters(
    new RpcCustomExceptionFilter(),
    new GlobalRpcExceptionsFilter(),
  );
  await app.listen(envs.port);

  logger.log(`Application is running on: port${envs.port}`);
}
bootstrap();
