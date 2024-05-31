import { Body, Controller, Delete, Get, HttpCode, Logger, Param, Post, Put, Query } from '@nestjs/common';
import { AlumnoService } from '../services/alumno.service';
import { CreateAlumnoDto, UpdateAlumnoDto, QueryAlumnoDto, QueryMatriculaDto, QueryAlumnoTurnoDto } from '../dto'
import { QueryAlumnosGradoDto } from 'src/dto/queryAlumnosGrado.dto';
import { QueryAlumnosGradoGrupoDto } from 'src/dto/queryAlumnosGradoGrupo.dto';


@Controller('alumnos')
export class AlumnoController {
    private readonly logger = new Logger(AlumnoController.name)

    constructor(private readonly alumnoService: AlumnoService) { }

    @Get()
    async getAlumnos() {
        this.logger.log(' GET - Recuperando todos los alumnos')
        return await this.alumnoService.getAlumnos()
    }

    @Get('id')
    async getAlumnoByMatricula(@Query() {matricula}: QueryMatriculaDto) {
        this.logger.log(`GET - Recuperando alumno con matrícula ${matricula}`)
        return await this.alumnoService.getAlumnoByMatricula(matricula)
    }

    @Get('nombre')
    async getAlumnoByName(@Query() query: QueryAlumnoDto) {
        const { nombre, apellido_paterno, apellido_materno } = query
        this.logger.log(`GET - Recuperando alumno con nombre ${nombre} ${apellido_paterno} ${apellido_materno}`)
        return await this.alumnoService.getAlumnoByName(nombre, apellido_paterno, apellido_materno)
    }

    @Get('turno')
    async getAlumnoByTurno(@Query() {turno}: QueryAlumnoTurnoDto) {
        this.logger.log(`GET - Recuperando alumnos con turno ${turno}`)
        return await this.alumnoService.getAlumnoByTurno(turno)
    }

    @Get('grado')
    async getAlumnosByGrado(@Query() {grado, turno}: QueryAlumnosGradoDto) {
        this.logger.log(`GET - Recuperando alumnos con grado ${grado} y turno ${turno}`)
        return await this.alumnoService.getAlumnosByGrado(grado, turno)
    }

    @Get('grupo')
    async getAlumnosByGradoGrupo(@Query() {grado, grupo, turno}: QueryAlumnosGradoGrupoDto) {
        this.logger.log(`GET - Recuperando alumnos con grado ${grado}, grupo ${grupo} y ${turno}`)
        return await this.alumnoService.getAlumnosByGradoGrupo(grado, grupo, turno)
    }

    @Post()
    @HttpCode(201)
    async createAlumno(@Body() createAlumnoDto: CreateAlumnoDto) {
        this.logger.log(`POST - Creando alumno`)
        return await this.alumnoService.createAlumno(createAlumnoDto)
    }

    @Put()
    @HttpCode(204)
    async updateAlumno(@Body() updateAlumnoDto: UpdateAlumnoDto) {
        this.logger.log(`PUT - Actualizando informacion de alumno`)
        this.logger.debug(JSON.stringify(updateAlumnoDto))
        return await this.alumnoService.updateAlumno(updateAlumnoDto)
    }

    @Delete()
    @HttpCode(204)
    async deleteAlumno(@Query() {matricula}: QueryMatriculaDto) {
        this.logger.log(`DELETE - Eliminando alumno con matricula ${matricula}`)
        return await this.alumnoService.deleteAlumno(matricula)
    }
}
