import { Body, Controller, Get, HttpCode, Logger, Post, Query, Delete } from "@nestjs/common";
import { CreateIncidenciaDto, QueryAlumnoTurnoDto, QueryAlumnosGradoDto, QueryAlumnosGradoGrupoDto, QueryIncidenciaIdDto, QueryIncidenciasAlumnoDto } from "src/dto";
import { IncidenciasService } from "src/services/incidencias.service";


@Controller('incidencias')
export class IncidenciasController {

    private readonly logger = new Logger(IncidenciasController.name)

    constructor(private readonly incidenciasService: IncidenciasService) { }
    
    @Get()
    async getIncidencias() {
        this.logger.log('GET - Recuperando todas las incidencias')
        return await this.incidenciasService.getIncidencias()
    }

    @Get('id')
    async getIncidencia(@Query() {id}: QueryIncidenciaIdDto) {
        this.logger.log(`GET - Recuperando incidencia con id ${id}`)
        return await this.incidenciasService.getIncidencia(id)
    }

    @Get('alumno')
    async getIncidenciasAlumno(@Query() {matricula}: QueryIncidenciasAlumnoDto) {
        this.logger.log(`GET - Recuperando todas las incidencias de un alumno con matrícula ${matricula}`)
        return await this.incidenciasService.getIncidenciasAlumno(matricula)
    }

    @Get('turno')
    async getAlumnoByTurno(@Query() {turno}: QueryAlumnoTurnoDto) {
        this.logger.log(`GET - Recuperando todas las incidencias de alumnos con turno ${turno}}`)
        return await this.incidenciasService.getAlumnoByTurno(turno)
    }

    @Get('grado')
    async getIncidenciasAlumnos(@Query() {grado, turno}: QueryAlumnosGradoDto) {
        this.logger.log(`GET - Recuperando todas las incidencias de ${grado} con turno ${turno}}`)
        return await this.incidenciasService.getIncidenciasAlumnos(grado, turno)
    }

    @Get('grupo')
    async getIncidenciasAlumnosGrupo(@Query() {grado, grupo, turno}: QueryAlumnosGradoGrupoDto) {
        this.logger.log(`GET - Recuperando todas las incidencias de ${grupo} con grado ${grado} y turno ${turno}`)
        return await this.incidenciasService.getIncidenciasAlumnosGrupo(grado, grupo, turno)
    }

    @Post()
    @HttpCode(201)
    async createIncidencia(@Body() incidencia: CreateIncidenciaDto) {
        this.logger.log('POST - Creando incidencia')
        return await this.incidenciasService.createIncidencia(incidencia)
    }

    @Delete()
    @HttpCode(202)
    async deleteIncidencia(@Query() {id}: QueryIncidenciaIdDto) {
        this.logger.debug(`DELETE - Eliminando incidencia con id ${id}`)
        return await this.incidenciasService.deleteIncidencia(id)
    }
}
