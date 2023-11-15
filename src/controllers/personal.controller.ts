import { Body, Controller, Delete, Get, HttpCode, Logger, Post, Query } from "@nestjs/common";
import { CreatePersonalDto } from "src/dto/createPersonal.dto";
import { DeletePersonalDto } from "src/dto/deletePersonal.dto";
import { QueryDocentesDto } from "src/dto/queryDocentes.dto";
import { QueryPersonalIdDto } from "src/dto/queryPersonalId.dto";
import { PersonalService } from "src/services/personal.service";


@Controller('personal')
export class PersonalController {
    private readonly logger = new Logger(PersonalController.name)

    constructor(private readonly personalService: PersonalService) { }
    
    @Get()
    async getPersonal() {
        this.logger.debug('Recuperando todo el personal')
        return await this.personalService.getPersonal()
    }

    @Get('/turno')
    async getPersonalTurno(@Query() {turno}: {turno: string}) {
        this.logger.debug(`Recuperando el personal del turno ${turno}`)
        return await this.personalService.getPersonalTurno(turno)
    }

    @Get('/id')
    async getPersonalById(@Query() {id}: QueryPersonalIdDto) {
        this.logger.log(`Recuperando personal con id ${id}`)
        return await this.personalService.getPersonalById(id)
    }

    @Get('/docentes')
    async getDocentes(@Query() {funsion, turno}: QueryDocentesDto) {
        this.logger.log(`Recuperando docentes con funsion ${funsion} y turno ${turno}`)
        return await this.personalService.getDocentes(funsion, turno)
    }

    @Post()
    @HttpCode(201)
    async createPersonal(@Body() createPersonalDto: CreatePersonalDto) {
        this.logger.log(`Creando personal`)
        return await this.personalService.createPersonal(createPersonalDto)
    }   

    @Delete()
    @HttpCode(204)
    async deletePersonal(@Query() {id}: DeletePersonalDto) {
        this.logger.log(`Eliminando personal con id ${id}`)
        return await this.personalService.deletePersonal(id)
    } 

}