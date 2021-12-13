import { TypeOrmModuleOptions } from '@nestjs/typeorm';

class ConfigService {
  constructor() {
    for (const envName of Object.keys(process.env)) {
      process.env[envName] = process.env[envName].replace(/\\n/g, '\n');
    }
  }

  public get(key: string): string {
    return process.env[key];
  }

  public getNumber(key: string): number {
    return Number(this.get(key));
  }

  get nodeEnv(): string {
    return this.get('NODE_ENV') || 'development';
  }

  get isDevelopment(): boolean {
    return this.nodeEnv === 'development';
  }

  get isTest(): boolean {
    return this.nodeEnv === 'test';
  }

  get isProduction(): boolean {
    return this.nodeEnv === 'production';
  }

  get typeOrmConfig(): TypeOrmModuleOptions {
    return {
      type: 'postgres',
      host: this.get('DB_HOST'),
      port: this.getNumber('DB_PORT'),
      username: this.get('DB_USERNAME'),
      password: this.get('DB_PASSWORD'),
      database: this.get('DB_DATABASE'),
      synchronize: this.get('DB_SYNCHRONIZE') == 'true',
      entities: ['dist/**/*.entity{.ts,.js}'],
      ssl: false,
    };
  }
}

const configService = new ConfigService();

export { configService, ConfigService };
