import { HttpException, HttpStatus, Injectable, Logger } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { CreateAlumnoDto, UpdateAlumnoDto } from 'src/dto';
import { Alumno } from 'src/typeorm';
import { Repository } from 'typeorm';

@Injectable()
export class AlumnoService {

    private readonly logger = new Logger(AlumnoService.name)

    constructor(
        @InjectRepository(Alumno) private readonly alumnoRepository: Repository<Alumno>
    ) {}

    async getAlumnos () {
        return await this.alumnoRepository.find()
    }

    async getAlumnoByMatricula(matricula: number){
        return await this.alumnoRepository.find({where: {
            matricula: matricula
        }})
    }

    async getAlumnoByName(nombre: string, apellido_paterno: string, apellido_materno: string){
        return await this.alumnoRepository.find({where: {
            nombre: nombre, 
            apellido_paterno: apellido_paterno, 
            apellido_materno: apellido_materno
        }})
    }

    async getAlumnosByGrado(grado: number, turno: string){
        return await this.alumnoRepository.find({where: {
            grado: grado,
            turno: turno
        }})
    }

    async getAlumnosByGradoGrupo(grado: number, grupo: string, turno: string){
        return await this.alumnoRepository.find({where: {
            grado: grado,
            grupo: grupo,
            turno: turno
        }})
    }

    async createAlumno(createAlumnoDto: CreateAlumnoDto){

        try {
            const newAlumno = this.alumnoRepository.create(createAlumnoDto)
            return await this.alumnoRepository.save(newAlumno)
        }
        catch (error){
            this.logger.error(`Alumno no se pudo crear con error ${error}`)
            throw new HttpException('Error creando alumno', HttpStatus.UNPROCESSABLE_ENTITY)
        }
    }

    async updateAlumno(updateAlumnoDto: UpdateAlumnoDto){
        const matricula = updateAlumnoDto.matricula
        try {
            return await this.alumnoRepository.update({matricula: matricula}, {...updateAlumnoDto})
        }
        catch (error){
            this.logger.error(`Alumno no se pudo crear con error ${error}`)
            throw new HttpException('Error Actualizando al alumno', HttpStatus.UNPROCESSABLE_ENTITY)
        }
    }

}
