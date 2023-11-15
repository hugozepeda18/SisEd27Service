import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';

import { Alumno } from 'src/typeorm';
import { AlumnoService } from '../services/alumno.service';
import { AlumnoController } from '../controllers/alumno.controller';

@Module({
  imports: [
    TypeOrmModule.forFeature([Alumno])
  ],
  providers: [AlumnoService],
  controllers: [AlumnoController]
})
export class AlumnoModule {}
