import { Module } from '@nestjs/common';
import { env } from './env';
import { ConfigService } from '@nestjs/config';
import { AppConfigService } from './config.service';

@Module({
  imports: [env.module],
  providers: [ConfigService, AppConfigService],
  exports: [ConfigService, AppConfigService],
})
export class AppConfigModule {}
