/*Nest & Dependencies*/
import { HttpException, HttpStatus, Injectable, Logger } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
/*Self*/
import { CreatePersonalDto } from 'src/dto/createPersonal.dto';
import { Personal } from 'src/typeorm';

@Injectable()
export class PersonalService {

    private readonly logger = new Logger(PersonalService.name)

    constructor(
        @InjectRepository(Personal) private readonly personalRepository: Repository<Personal>
    ) {}

    async getDocentes(funsion: string, turno: string) {
        return await this.personalRepository.find({where: {
            funsion: funsion,
            turno: turno
        }})
    }

    async getPersonalById(id: number) {
        return await this.personalRepository.findOne({where: {
            id: id
        }})
    }

    async getPersonal() {
        return await this.personalRepository.find()
    }

    async getPersonalTurno(turno: string) {
        return await this.personalRepository.find(
            {where: {
                turno: turno
            }}
        )
    }

    async createPersonal(createPersonalDto: CreatePersonalDto){

        try {
            const newPersonal = this.personalRepository.create(createPersonalDto)
            return await this.personalRepository.save(newPersonal)
        }
        catch (error){
            this.logger.error(`Alumno no se pudo crear con error ${error}`)
            throw new HttpException('Error creando alumno', HttpStatus.UNPROCESSABLE_ENTITY)
        }
    }

    async deletePersonal(id: number) {
        return await this.personalRepository.delete(id)
    }

}
