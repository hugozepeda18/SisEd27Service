import { Module } from "@nestjs/common";
import { TypeOrmModule } from "@nestjs/typeorm";
import { AsistenciaController } from "src/controllers/asistencia.controller";
import { AsistenciaService } from "src/services/asistencia.service";
import { Alumno } from "src/typeorm";
import { Asistencia } from "src/typeorm/asistencia.entity";


@Module({
    imports: [
        TypeOrmModule.forFeature([Asistencia]),
        TypeOrmModule.forFeature([Alumno])
    ],
    providers: [AsistenciaService],
    controllers: [AsistenciaController]
})

export class AsistenciaModule {}