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
        type: 'postgres',
        host: configService.get('POSTGRES_HOST'),
        port: configService.get<number>('POSTGRES_PORT'),
        username: configService.get('POSTGRES_USER'),
        password: configService.get('POSTGRES_PASSWORD'),
        database: configService.get('POSTGRES_DATABASE'),
        autoLoadEntities: true,
        synchronize: false,
        ssl: true,
      }),
    }),
    AlumnoModule,
    PersonalModule,
    IncidenciasModule,
    UserModule, 
    AsistenciaModule
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
