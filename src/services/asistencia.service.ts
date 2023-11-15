import { HttpException, HttpStatus, Injectable, Logger } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { CreateAsistenciaDto } from "src/dto";
import { Alumno } from "src/typeorm";
import { Asistencia } from "src/typeorm/asistencia.entity";
import { Repository } from "typeorm";


@Injectable()
export class AsistenciaService {
    
    private readonly logger = new Logger(AsistenciaService.name)

    constructor(
        @InjectRepository(Asistencia) private readonly asistenciaRepository: Repository<Asistencia>,
        @InjectRepository(Alumno) private readonly alumnoRepository: Repository<Alumno>
    ) {}

    async getAsistenciasAlumno (matricula: number) {
        const alumno = await this.alumnoRepository.findOne({where: {matricula}})
        return await this.asistenciaRepository.find({
            where: { alumno_id: alumno}
        })
    }

    async getAsistenciasAlumnos (grado: number, turno: string) {
        const alumnos = await this.alumnoRepository.find({where: {grado, turno}})
        return await this.asistenciaRepository.find({
            where: { alumno_id: alumnos}
        })
    }

    async getAsistenciasAlumnosGrupo (grado: number, turno: string, grupo: string) {
        const alumnos = await this.alumnoRepository.find({where: {grado, turno, grupo}})
        return await this.asistenciaRepository.find({
            where: { alumno_id: alumnos}
        })
    }

    async createAsistencia (asistencia: CreateAsistenciaDto) {
        try {
            const asistenciaEntity = this.asistenciaRepository.create(asistencia)
            this.logger.debug('Creando asistencia')
            return await this.asistenciaRepository.save(asistenciaEntity)
        } catch (error) {
            this.logger.error(`Incidencia con ${error}`)
            throw new HttpException('Error creando asistencia', HttpStatus.INTERNAL_SERVER_ERROR)
        }
    }
}