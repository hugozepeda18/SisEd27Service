import { Injectable, Logger } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { Repository } from "typeorm";
import { HttpException, HttpStatus } from "@nestjs/common";

import { CreateIncidenciaDto } from "src/dto";
import { Alumno, Incidencias } from "src/typeorm";


@Injectable()
export class IncidenciasService {

    private readonly logger = new Logger(IncidenciasService.name)

    constructor(
        @InjectRepository(Incidencias) private readonly incidenciasRepository: Repository<Incidencias>,
        @InjectRepository(Alumno) private readonly alumnoRepository: Repository<Alumno>
    ) {}

    async getIncidencias () {
        try {
            const incidencias = await this.incidenciasRepository.find()
            if (incidencias.length == 0) {
                throw new HttpException('No se encontraron incidencias', HttpStatus.NOT_FOUND)
            }
            return incidencias
        } catch (error) {
            this.logger.error(`Error recuperando incidencias`)
            throw new HttpException('Error recuperando incidencias', HttpStatus.INTERNAL_SERVER_ERROR)
        }
    }

    async getIncidencia (id: number) {
        try {
            const incidencia = await this.incidenciasRepository.findOne({
                where: {id},
                relations: {
                    alumno_id: true,
                    personal_id: true
                },
            })
            if (!incidencia) {
                throw new HttpException('No se encontró incidencia con ese id', HttpStatus.NOT_FOUND)
            }
            return incidencia
        } catch (error) {
            this.logger.error(`Error recuperando incidencia con id ${id}`)
            throw new HttpException('Error recuperando incidencia', HttpStatus.INTERNAL_SERVER_ERROR)
        }
    }

    async getIncidenciasAlumno (matricula: number) {
        try {
            const alumno = await this.alumnoRepository.findOne({where: {matricula}})
            const incidencias = await this.incidenciasRepository.find({
                where: { alumno_id: alumno},
                relations: {
                    alumno_id: true,
                    personal_id: true
                },
            })
            return incidencias
        }   catch (error) {
            this.logger.error(`Error recuperando incidencias de alumno con matrícula ${matricula}`)
            throw new HttpException('Error recuperando incidencias', HttpStatus.INTERNAL_SERVER_ERROR)
        }
    }

    async getAlumnoByTurno (turno: string) {
        try {
            const alumnos = await this.alumnoRepository.find({where: {turno}})
            const incidencias = await this.incidenciasRepository.find({
                where: { alumno_id: alumnos},
                relations: {
                    alumno_id: true,
                    personal_id: true
                },
            })
            if (incidencias.length == 0) {
                throw new HttpException('No se encontraron incidencias', HttpStatus.NOT_FOUND)
            }
            return incidencias
        } catch (error) {
            this.logger.error(`Error recuperando incidencias de alumnos con turno ${turno}`)
            throw new HttpException('Error recuperando incidencias', HttpStatus.INTERNAL_SERVER_ERROR)   
        }
    }

    async getIncidenciasAlumnos (grado: number, turno: string) {
        try {
            const alumnos = await this.alumnoRepository.find({where: {grado, turno}})
            const incidencias = await this.incidenciasRepository.find({
                where: { alumno_id: alumnos},
                relations: {
                    alumno_id: true,
                    personal_id: true
                },
            })
            if (incidencias.length == 0) {
                throw new HttpException('No se encontraron incidencias', HttpStatus.NOT_FOUND)
            }
            return incidencias
        } catch (error) {
            this.logger.error(`Error recuperando incidencias de alumnos con grado ${grado} y turno ${turno}`)
            throw new HttpException('Error recuperando incidencias', HttpStatus.INTERNAL_SERVER_ERROR)   
        }
    }

    async getIncidenciasAlumnosGrupo (grado: number, grupo: string, turno: string) {
        try {
            const alumnos = await this.alumnoRepository.find({where: {grado, grupo, turno}})
            const incidencias = await this.incidenciasRepository.find({
                where: { alumno_id: alumnos},
                relations: {
                    alumno_id: true,
                    personal_id: true
                },
            })
            if (incidencias.length == 0) {
                throw new HttpException('No se encontraron incidencias', HttpStatus.NOT_FOUND)
            }
            return incidencias
        } catch (error) {
            this.logger.error(`Error recuperando incidencias de alumnos con grado ${grado}, grupo ${grupo} y turno ${turno}`)
            throw new HttpException('Error recuperando incidencias', HttpStatus.INTERNAL_SERVER_ERROR)
        }
    }

    async createIncidencia(createIncidenciaDto: CreateIncidenciaDto){
        try {
            const newIncidencia = this.incidenciasRepository.create(createIncidenciaDto)
            this.logger.log("Incidencia creada")
            const incidencia = await this.incidenciasRepository.save(newIncidencia)
            if (incidencia) {
                this.logger.log("Incidencia guardada")
                const matricula = createIncidenciaDto.alumno_id.matricula
                const alumno = await this.alumnoRepository.findOne({where: {matricula}})
                if (alumno == null) {
                    this.logger.log("Alumno no encontrado, borrando incidencia")
                    this.incidenciasRepository.delete(incidencia.id)
                }
                this.logger.log("Alumno encontrado")
                this.logger.log(alumno.matricula)
                if(createIncidenciaDto.tipo === 1) {
                    return this.alumnoRepository.update({matricula: alumno.matricula}, {incidencias: alumno.incidencias + 1})
                } else if (createIncidenciaDto.tipo === 2) {
                    return this.alumnoRepository.update({matricula: alumno.matricula}, {incidencias_graves: alumno.incidencias_graves + 1})
                } else if (createIncidenciaDto.tipo === 3) {
                    return this.alumnoRepository.update({matricula: alumno.matricula}, {incidencias_muy_graves: alumno.incidencias_muy_graves + 1})
                }
            }
        }
        catch (error){
            this.logger.error(`Incidencia no se pudo crear con error ${error}`)
            throw new HttpException('Error creando incidencia', HttpStatus.UNPROCESSABLE_ENTITY)
        }
    }

    async deleteIncidencia(id: number) {
        try {
            const incidencia = await this.incidenciasRepository.findOne({
                where: {id}
            , relations: {
                alumno_id: true,
                personal_id: true
            }})
            const incidenciaBorrada = await this.incidenciasRepository.delete(id)
            this.logger.log("Incidencia borrada")
            if (incidenciaBorrada) {
                const alumno = await this.alumnoRepository.find({where: {matricula: incidencia.alumno_id.matricula}})
                if(incidencia.tipo === 1) {
                    return this.alumnoRepository.update({matricula: alumno[0].matricula}, {incidencias: alumno[0].incidencias - 1})
                } else if (incidencia.tipo === 2) {
                    return this.alumnoRepository.update({matricula: alumno[0].matricula}, {incidencias_graves: alumno[0].incidencias_graves - 1})
                } else if (incidencia.tipo === 3) {
                    return this.alumnoRepository.update({matricula: alumno[0].matricula}, {incidencias_muy_graves: alumno[0].incidencias_muy_graves - 1})
                }
            } else {
                throw new HttpException('No se borró la incidencia', HttpStatus.CONFLICT)
            }
        } 
        catch (error) {
            this.logger.error(`Incidencia no se pudo borrar con error ${error}`)
            throw new HttpException('Error borrando incidencia', HttpStatus.BAD_REQUEST)
        }
    }
}