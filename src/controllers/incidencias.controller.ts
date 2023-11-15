import { Body, Controller, Get, HttpCode, Logger, Post, Query, Delete } from "@nestjs/common";
import { CreateIncidenciaDto, QueryAlumnosGradoDto, QueryAlumnosGradoGrupoDto, QueryIncidenciaIdDto, QueryIncidenciasAlumnoDto } from "src/dto";
import { IncidenciasService } from "src/services/incidencias.service";


@Controller('incidencias')
export class IncidenciasController {

    private readonly logger = new Logger(IncidenciasController.name)

    constructor(private readonly incidenciasService: IncidenciasService) { }
    
    @Get()
    async getIncidencias() {
        this.logger.debug('Recuperando todas las incidencias')
        return await this.incidenciasService.getIncidencias()
    }

    @Get('/id')
    async getIncidencia(@Query() {id}: QueryIncidenciaIdDto) {
        this.logger.debug('Recuperando incidencia por id')
        return await this.incidenciasService.getIncidencia(id)
    }

    @Get('/alumno')
    async getIncidenciasAlumno(@Query() {matricula}: QueryIncidenciasAlumnoDto) {
        this.logger.debug('Recuperando todas las incidencias de un alumno')
        return await this.incidenciasService.getIncidenciasAlumno(matricula)
    }

    @Get('/alumnos/grado')
    async getIncidenciasAlumnos(@Query() {grado, turno}: QueryAlumnosGradoDto) {
        this.logger.debug('Recuperando todas las incidencias de un grupo con turno')
        return await this.incidenciasService.getIncidenciasAlumnos(grado, turno)
    }

    @Get('/alumnos/grado/grupo')
    async getIncidenciasAlumnosGrupo(@Query() {grado, grupo, turno}: QueryAlumnosGradoGrupoDto) {
        this.logger.debug('Recuperando todas las incidencias de un grupo con grado y turno')
        return await this.incidenciasService.getIncidenciasAlumnosGrupo(grado, grupo, turno)
    }

    @Post()
    @HttpCode(201)
    async createIncidencia(@Body() incidencia: CreateIncidenciaDto) {
        this.logger.debug('Creando incidencia')
        return await this.incidenciasService.createIncidencia(incidencia)
    }

    @Delete()
    @HttpCode(202)
    async deleteIncidencia(@Query() {id}: QueryIncidenciaIdDto) {
        this.logger.debug('Eliminando incidencia')
        return await this.incidenciasService.deleteIncidencia(id)
    }
}
