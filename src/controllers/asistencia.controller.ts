import { Body, Controller, Get, HttpCode, Logger, Post, Query } from "@nestjs/common";
import { CreateAsistenciaDto, QueryAlumnosGradoDto, QueryAlumnosGradoGrupoDto, QueryIncidenciasAlumnoDto } from "src/dto";
import { AsistenciaService } from "src/services/asistencia.service";



@Controller('asistencia')
export class AsistenciaController {
    
    private readonly logger = new Logger(AsistenciaController.name)
    
    constructor(private readonly asistenciaService: AsistenciaService) { } 
    
    @Get('/alumno')
    async getAsistenciasAlumno(@Query() {matricula}: QueryIncidenciasAlumnoDto) {
        this.logger.debug('Recuperando todas las asistencias de un alumno')
        return await this.asistenciaService.getAsistenciasAlumno(matricula)
    }

    @Get('/alumnos/grado')
    async getAsistenciasAlumnos(@Query() {grado, turno}: QueryAlumnosGradoDto) {
        this.logger.debug('Recuperando todas las asistencias de un grado')
        return await this.asistenciaService.getAsistenciasAlumnos(grado, turno)
    }

    @Get('/alumnos/grado/grupo')
    async getAsistenciasAlumnosGrupo(@Query() {grado, turno, grupo}: QueryAlumnosGradoGrupoDto) {
        this.logger.debug('Recuperando todas las asistencias de un grupo')
        return await this.asistenciaService.getAsistenciasAlumnosGrupo(grado, turno, grupo)
    }

    @Post()
    @HttpCode(201)
    async createAsistencia(@Body() asistencia: CreateAsistenciaDto) {
        this.logger.debug('Creando asistencia')
        return await this.asistenciaService.createAsistencia(asistencia)
    }
}