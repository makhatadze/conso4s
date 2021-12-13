import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ConfigService, configService } from './configs/config.service';
import { ServeStaticModule } from '@nestjs/serve-static';
import { join } from 'path';
import { EmployeeModule } from './modules/employee/employee.module';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
      envFilePath: `apps/conso4s-core/src/environment/.${process.env.NODE_ENV}.env`,
    }),
    ServeStaticModule.forRoot({
      rootPath: join(__dirname, '..', 'public'),
    }),
    TypeOrmModule.forRoot(configService.typeOrmConfig),
    EmployeeModule,
  ],
  providers: [ConfigService],
})
export class Conso4sCoreModule {}
