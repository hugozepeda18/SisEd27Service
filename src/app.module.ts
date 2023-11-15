import { Module } from '@nestjs/common';
import { ConfigModule, ConfigService } from '@nestjs/config';
import {TypeOrmModule} from '@nestjs/typeorm';

import { AppController } from './app.controller';
import { AppService } from './app.service';
import { AlumnoModule } from './modules/alumno.module';
import { PersonalModule } from './modules/personal.module';
import { IncidenciasModule } from './modules/incidencias.module';
import { UserModule } from './modules/user.module';
import { AsistenciaModule } from './modules/asistencia.module';

@Module({
  imports: [
    ConfigModule.forRoot({ isGlobal: true }),
    TypeOrmModule.forRootAsync({
      imports: [ConfigModule],
      inject: [ConfigService],
      useFactory: (configService: ConfigService) => ({
        type: 'mysql',
        host: configService.get('MYSQL_HOST'),
        port: configService.get<number>('MYSQL_PORT'),
        username: configService.get('MYSQL_USER'),
        password: configService.get('MYSQL_PASSWORD'),
        database: configService.get('MYSQL_DATABASE'),
        autoLoadEntities: true,
        synchronize: false,
      }),
    }),
    AlumnoModule,
    PersonalModule,
    IncidenciasModule,
    UserModule,
    AsistenciaModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
