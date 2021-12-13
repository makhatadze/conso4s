import { NestFactory } from '@nestjs/core';
import { Conso4sCoreModule } from './conso4s-core.module';
import { Transport } from '@nestjs/microservices';

async function bootstrap() {
  const app = await NestFactory.createMicroservice(Conso4sCoreModule, {
    transport: Transport.REDIS,
    options: {
      url: `redis://${process.env.REDIS_HOST}:${process.env.REDIS_PORT}`,
      auth_pass: process.env.REDIS_PASS,
    },
  });
  await app.listen();
}

bootstrap();
