import { Body, Controller, Get, HttpCode, Logger, Post, Query } from "@nestjs/common";
import { CreateAsistenciaDto, QueryAlumnosGradoDto, QueryAlumnosGradoGrupoDto, QueryIncidenciasAlumnoDto } from "src/dto";
import { AsistenciaService } from "src/services/asistencia.service";



@Controller('asistencia')
export class AsistenciaController {
    
    private readonly logger = new Logger(AsistenciaController.name)
    
    constructor(private readonly asistenciaService: AsistenciaService) { } 
    
    @Get('alumno')
    async getAsistenciasAlumno(@Query() {matricula}: QueryIncidenciasAlumnoDto) {
        this.logger.log(`GET - Recuperando todas las asistencias de alumno con matricula ${matricula}`)
        return await this.asistenciaService.getAsistenciasAlumno(matricula)
    }

    @Get('grado')
    async getAsistenciasAlumnos(@Query() {grado, turno}: QueryAlumnosGradoDto) {
        this.logger.log(`GET - Recuperando todas las asistencias de un grado ${grado} con turno ${turno}`)
        return await this.asistenciaService.getAsistenciasAlumnos(grado, turno)
    }

    @Get('grupo')
    async getAsistenciasAlumnosGrupo(@Query() {grado, turno, grupo}: QueryAlumnosGradoGrupoDto) {
        this.logger.log(`GET - Recuperando todas las asistencias de un grado y grupo ${grado} ${grupo} con turno ${turno}`)
        return await this.asistenciaService.getAsistenciasAlumnosGrupo(grado, turno, grupo)
    }

    @Post()
    @HttpCode(201)
    async createAsistencia(@Body() asistencia: CreateAsistenciaDto) {
        this.logger.log('POST - Creando asistencia')
        return await this.asistenciaService.createAsistencia(asistencia)
    }
}