import { NestFactory } from '@nestjs/core';
import { Conso4sWebApiModule } from './conso4s-web-api.module';
import { Logger } from '@nestjs/common';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';

async function bootstrap() {
  const app = await NestFactory.create(Conso4sWebApiModule);
  const logger = new Logger();

  app.enableCors();

  const config = new DocumentBuilder()
    .setTitle('WebApp')
    .setDescription('Conso Web API')
    .setVersion('1.0')
    .build();
  const document = SwaggerModule.createDocument(app, config);
  SwaggerModule.setup('api', app, document);

  const PORT = process.env.HTTP_PORT || 4000;
  await app.listen(PORT, () => {
    logger.log(`Conso4s core microservice is listening to ${PORT}`);
  });
}
bootstrap();
