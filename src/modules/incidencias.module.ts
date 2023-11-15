import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { IncidenciasController } from 'src/controllers/incidencias.controller';
import { IncidenciasService } from 'src/services/incidencias.service';
import { Alumno, Incidencias } from 'src/typeorm';

@Module({
  imports: [
    TypeOrmModule.forFeature([Incidencias]),
    TypeOrmModule.forFeature([Alumno])
  ],
  providers: [IncidenciasService],
  controllers: [IncidenciasController]
})
export class IncidenciasModule {}