import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { env, AppConfig } from './env';

@Injectable()
export class AppConfigService implements AppConfig {
  constructor(private readonly cs: ConfigService) {}

  public get env(): string {
    return env.get(this.cs, 'env')!;
  }

  public get host(): string {
    return env.get(this.cs, 'host')!;
  }

  public get port(): number {
    return env.get(this.cs, 'port')!;
  }
}
