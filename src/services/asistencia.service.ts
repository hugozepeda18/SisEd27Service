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
        try {
            const alumno = await this.alumnoRepository.findOne({where: {matricula}})
            if (!alumno) {
                throw new HttpException('No se encontró alumno con esa matricula', HttpStatus.NOT_FOUND)
            }
            return await this.asistenciaRepository.find({
                where: { alumno_id: alumno}
            })
        } catch (error) {
            this.logger.error(`Asistencia de alumno ${matricula} - ${error}`)
            throw new HttpException('Error recuperando asistencias', HttpStatus.INTERNAL_SERVER_ERROR)  
        }
    }

    async getAlumnoByTurno(turno: string) {
        try {
            const alumnos = await this.alumnoRepository.find({where: { turno: turno }})
            if (alumnos.length == 0) {
                throw new HttpException('No se encontraron alumnos con ese turno', HttpStatus.NOT_FOUND)
            }
            return await this.asistenciaRepository.find({
                where: { alumno_id: alumnos}
            })
        } catch (error) {
            this.logger.error(`Asistencia de alumnos con turno ${turno} - ${error}`)
            throw new HttpException('Error recuperando alumno', HttpStatus.INTERNAL_SERVER_ERROR)   
        }
    }

    async getAsistenciasAlumnos (grado: number, turno: string) {
        try {
            const alumnos = await this.alumnoRepository.find({where: {grado, turno}})
            if (alumnos.length == 0) {
                throw new HttpException('No se encontró alumnos con ese grado y turno', HttpStatus.NOT_FOUND)
            }
            return await this.asistenciaRepository.find({
                where: { alumno_id: alumnos}
            })
        } catch (error) {
            this.logger.error(`Asistencia de alumnos de grado ${grado} y turno ${turno} - ${error}`)
            throw new HttpException('Error recuperando asistencias', HttpStatus.INTERNAL_SERVER_ERROR)
        }
    }

    async getAsistenciasAlumnosGrupo (grado: number, turno: string, grupo: string) {
        try {
            const alumnos = await this.alumnoRepository.find({where: {grado, turno, grupo}})
            if (alumnos.length == 0) {
                throw new HttpException('No se encontró alumnos con ese grado, turno y grupo', HttpStatus.NOT_FOUND)
            }
            return await this.asistenciaRepository.find({
                where: { alumno_id: alumnos}
            })
        } catch (error) {
            this.logger.error(`Asistencia de alumnos de grado ${grado} y turno ${turno} - ${error}`)
            throw new HttpException('Error recuperando asistencias', HttpStatus.INTERNAL_SERVER_ERROR)
        }
    }

    async createAsistencia (asistencia: CreateAsistenciaDto) {
        try {
            const asistenciaEntity = this.asistenciaRepository.create(asistencia)
            this.logger.log('Asistencia creada')
            return await this.asistenciaRepository.save(asistenciaEntity)
        } catch (error) {
            this.logger.error(`Asistencia con error - ${error}`)
            throw new HttpException('Error creando asistencia', HttpStatus.INTERNAL_SERVER_ERROR)
        }
    }
}