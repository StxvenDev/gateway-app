import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { envs } from './config/envs';
import { RpcCustomExceptionFilter } from './common';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  app.useGlobalFilters(
    new RpcCustomExceptionFilter()
  )
  await app.listen(envs.port);
}
bootstrap();
