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
        try {
            const alumnos = await this.alumnoRepository.find()
            if (alumnos.length == 0) {
                throw new HttpException('No se encontraron alumnos', HttpStatus.NOT_FOUND)
            }
            return alumnos
        } catch (error) {
            this.logger.error(`Error recuperando alumnos - ${error}`)
            throw new HttpException('Error recuperando alumnos', HttpStatus.INTERNAL_SERVER_ERROR)   
        }
    }

    async getAlumnoByMatricula(matricula: number){
        try {
            const alumno = await this.alumnoRepository.find({where: {
                matricula: matricula
            }})
            if (alumno.length == 0) {
                throw new HttpException('No se encontró alumno con esa matricula', HttpStatus.NOT_FOUND)
            }
            return alumno
        } catch (error) {
            this.logger.error(`Error recuperando alumno con matricula ${matricula} - ${error}`)
            throw new HttpException('Error recuperando alumno', HttpStatus.INTERNAL_SERVER_ERROR)   
        }
    }

    async getAlumnoByName(nombre: string, apellido_paterno: string, apellido_materno: string){
        try {
            const alumno = await this.alumnoRepository.find({where: {
                nombre: nombre, 
                apellido_paterno: apellido_paterno, 
                apellido_materno: apellido_materno
            }})
            if (alumno.length == 0) {
                throw new HttpException('No se encontró alumno con ese nombre', HttpStatus.NOT_FOUND)
            }
            return alumno
        } catch (error) {
            this.logger.error(`Error recuperando alumno con nombre ${nombre} ${apellido_paterno} ${apellido_materno} - ${error}`)
            throw new HttpException('Error recuperando alumno', HttpStatus.INTERNAL_SERVER_ERROR)   
        }
    }

    async getAlumnoByTurno(turno: string) {
        try {
            const alumno = await this.alumnoRepository.find({where: {
                turno: turno
            }})
            if (alumno.length == 0) {
                throw new HttpException('No se encontraron alumnos con ese turno', HttpStatus.NOT_FOUND)
            }
            return alumno
        } catch (error) {
            this.logger.error(`Error recuperando alumnos con turno ${turno} - ${error}`)
            throw new HttpException('Error recuperando alumno', HttpStatus.INTERNAL_SERVER_ERROR)   
        }
    }

    async getAlumnosByGrado(grado: number, turno: string){
        try {
            const alumnos = await this.alumnoRepository.find({where: {
                grado: grado,
                turno: turno
            }})
            if (alumnos.length == 0) {
                throw new HttpException('No se encontraron alumnos', HttpStatus.NOT_FOUND)
            }
            return alumnos
        } catch (error) {
            this.logger.error(`Error recuperando alumnos con grado ${grado} y turno ${turno} - ${error}`)
            throw new HttpException('Error recuperando alumnos', HttpStatus.INTERNAL_SERVER_ERROR)   
        }
    }

    async getAlumnosByGradoGrupo(grado: number, grupo: string, turno: string){
        try {
            const alumnos = await this.alumnoRepository.find({where: {
                grado: grado,
                grupo: grupo,
                turno: turno
            }})
            if (alumnos.length == 0) {
                throw new HttpException('No se encontraron alumnos', HttpStatus.NOT_FOUND)
            }
            return alumnos
        } catch (error) { 
            this.logger.error(`Error recuperando alumnos con grado ${grado}, grupo ${grupo} y turno ${turno} - ${error}`)
            throw new HttpException('Error recuperando alumnos', HttpStatus.INTERNAL_SERVER_ERROR)   
        }
    }

    async createAlumno(createAlumnoDto: CreateAlumnoDto){
        try {
            const newAlumno = this.alumnoRepository.create(createAlumnoDto)
            this.logger.log('Alumno creado')
            return await this.alumnoRepository.save(newAlumno)
        }
        catch (error){
            this.logger.error(`Alumno no se pudo crear con error - ${error}`)
            throw new HttpException('Error creando alumno', HttpStatus.UNPROCESSABLE_ENTITY)
        }
    }

    async updateAlumno(updateAlumnoDto: UpdateAlumnoDto){
        const matricula = updateAlumnoDto.matricula
        try {
            return await this.alumnoRepository.update({matricula: matricula}, {...updateAlumnoDto})
        }
        catch (error){
            this.logger.error(`Alumno no se pudo actualizar con error - ${error}`)
            throw new HttpException('Error Actualizando al alumno', HttpStatus.UNPROCESSABLE_ENTITY)
        }
    }

    async deleteAlumno(matricula: number){
        try {
            const alumno = await this.alumnoRepository.findOne({where: {
                matricula: matricula
            }})
            if (!alumno) {
                throw new HttpException('No se encontró alumno con esa matricula', HttpStatus.NOT_FOUND)
            }
            return await this.alumnoRepository.delete({matricula: matricula})
        }
        catch (error){
            this.logger.error(`Alumno no se pudo eliminar con error - ${error}`)
            throw new HttpException('Error eliminando al alumno', HttpStatus.UNPROCESSABLE_ENTITY)
        }
    }

}
