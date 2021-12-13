import {
  MiddlewareConsumer,
  Module,
  NestModule,
  RequestMethod,
} from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { Conso4sWebApiService } from './conso4s-web-api.service';
import { Conso4sWebApiController } from './conso4s-web-api.controller';
import { MicroservicesModule } from './modules/microserices/microservices.module';
import { EmployeeModule } from './modules/employee/employee.module';

@Module({
  imports: [
    ConfigModule.forRoot({
      envFilePath: `apps/conso4s-web-api/src/environment/.${process.env.NODE_ENV}.env`,
      isGlobal: true,
    }),
    MicroservicesModule,
    EmployeeModule,
  ],
  controllers: [Conso4sWebApiController],
  providers: [Conso4sWebApiService],
})
export class Conso4sWebApiModule implements NestModule {
  configure(consumer: MiddlewareConsumer) {
    consumer
      .apply()
      .exclude(
        { path: 'auth', method: RequestMethod.ALL },
        'auth/(.*)',
        { path: 'organization', method: RequestMethod.ALL },
        'organization/(.*)',
        { path: 'branch', method: RequestMethod.ALL },
        'branch/(.*)',
      )
      .forRoutes({
        path: '*',
        method: RequestMethod.POST,
      });
  }
}
