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
        return await this.incidenciasRepository.find()
    }

    async getIncidencia (id: number) {
        return await this.incidenciasRepository.findOne({
            where: { id }, 
            relations: {
                alumno_id: true,
                personal_id: true
            },
        })
    }

    async getIncidenciasAlumno (matricula: number) {
        const alumno = await this.alumnoRepository.findOne({where: {matricula}})
        return await this.incidenciasRepository.find({
            where: { alumno_id: alumno},
            relations: {
                alumno_id: true,
                personal_id: true
            },
        })
    }

    async getIncidenciasAlumnos (grado: number, turno: string) {
        const alumnos = await this.alumnoRepository.find({where: {grado, turno}})
        return await this.incidenciasRepository.find({
            where: { alumno_id: alumnos},
            relations: {
                alumno_id: true,
                personal_id: true
            },
        })
    }

    async getIncidenciasAlumnosGrupo (grado: number, grupo: string, turno: string) {
        const alumnos = await this.alumnoRepository.find({where: {grado, grupo, turno}})
        return await this.incidenciasRepository.find({
            where: { alumno_id: alumnos},
            relations: {
                alumno_id: true,
                personal_id: true
            },
        })
    }

    async createIncidencia(createIncidenciaDto: CreateIncidenciaDto){
        
        try {
            const newIncidencia = this.incidenciasRepository.create(createIncidenciaDto)
            this.logger.debug("Incidencia creada")
            const incidencia = await this.incidenciasRepository.save(newIncidencia)
            if (incidencia) {
                const alumno = await this.alumnoRepository.findOne({where: {matricula: createIncidenciaDto.alumno_id.matricula}})
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
            this.logger.debug("Incidencia borrada")
            if (incidenciaBorrada) {
                const alumno = await this.alumnoRepository.findOne({where: {matricula: incidencia.alumno_id.matricula}})
                if(incidencia.tipo === 1) {
                    return this.alumnoRepository.update({matricula: alumno.matricula}, {incidencias: alumno.incidencias - 1})
                } else if (incidencia.tipo === 2) {
                    return this.alumnoRepository.update({matricula: alumno.matricula}, {incidencias_graves: alumno.incidencias_graves - 1})
                } else if (incidencia.tipo === 3) {
                    return this.alumnoRepository.update({matricula: alumno.matricula}, {incidencias_muy_graves: alumno.incidencias_muy_graves - 1})
                }
            }
            return 
        } 
        catch (error) {
            this.logger.error(`Incidencia no se pudo borrar con error ${error}`)
            throw new HttpException('Error borrando incidencia', HttpStatus.BAD_REQUEST)
        }
    }
}