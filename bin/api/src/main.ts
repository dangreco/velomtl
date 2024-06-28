import { NestFactory } from '@nestjs/core';
import {
  NestFastifyApplication,
  FastifyAdapter,
} from '@nestjs/platform-fastify';

import { AppModule } from './app.module';
import { AppConfigService } from './config/app/config.service';
import { Logger } from '@nestjs/common';

async function bootstrap() {
  const app = await NestFactory.create<NestFastifyApplication>(
    AppModule,
    new FastifyAdapter(),
  );

  const cfg = app.get(AppConfigService);
  await app.listen(cfg.port, () => {
    Logger.log(
      `velomtl is running on: http://${cfg.host}:${cfg.port}`,
      'Bootstrap',
    );
  });
}

bootstrap();
