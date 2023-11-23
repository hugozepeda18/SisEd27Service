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
        try {
            const docentes = await this.personalRepository.find({where: {
                funsion: funsion,
                turno: turno
            }})
            if (docentes.length == 0) {
                throw new HttpException('No se encontró docentes con esa funsion y turno', HttpStatus.NOT_FOUND)
            }
            return docentes
        } catch (error) {
            this.logger.error(`Error recuperando docentes con funsion ${funsion} y turno ${turno} - ${error}`)
            throw new HttpException('Error recuperando docentes', HttpStatus.INTERNAL_SERVER_ERROR)
        }
    }

    async getPersonalById(id: number) {
        try {
            const personal = await this.personalRepository.findOne({where: {
                id: id
            }})
            if (!personal) {
                throw new HttpException('No se encontró personal con ese id', HttpStatus.NOT_FOUND)
            }
            return personal
        } catch (error) {
            this.logger.error(`Error recuperando personal con id ${id} - ${error}`)
            throw new HttpException('Error recuperando personal', HttpStatus.INTERNAL_SERVER_ERROR)
        }
    }

    async getPersonal() {
        try {
            const personal = await this.personalRepository.find()
            if (personal.length == 0) {
                throw new HttpException('No se encontró personal', HttpStatus.NOT_FOUND)
            }
            return personal
        } catch (error) {
            this.logger.error(`Error recuperando personal - ${error}`)
            throw new HttpException('Error recuperando personal', HttpStatus.INTERNAL_SERVER_ERROR)
        }
    }

    async getPersonalTurno(turno: string) {
        try {
            const personal = await this.personalRepository.find(
                {where: {
                    turno: turno
                }}
            )
            if (personal.length == 0) {
                throw new HttpException('No se encontró personal con ese turno', HttpStatus.NOT_FOUND)
            }
        } catch (error) {
            this.logger.error(`Error recuperando personal con turno ${turno} - ${error}`)
            throw new HttpException('Error recuperando personal', HttpStatus.INTERNAL_SERVER_ERROR)
        }
    }

    async createPersonal(createPersonalDto: CreatePersonalDto){
        try {
            const newPersonal = this.personalRepository.create(createPersonalDto)
            this.logger.log('Personal creado')
            return await this.personalRepository.save(newPersonal)
        }
        catch (error){
            this.logger.error(`Nuevo personal no se pudo crear con error ${error}`)
            throw new HttpException('Error creando alumno', HttpStatus.UNPROCESSABLE_ENTITY)
        }
    }

    async deletePersonal(id: number) {
        try {
            const personal = await this.personalRepository.findOne({where: {
                id: id
            }})
            if (!personal) {
                throw new HttpException('No se encontró personal con ese id', HttpStatus.NOT_FOUND)
            }
            return await this.personalRepository.delete({id: id})
        } catch (error) {
            this.logger.error(`Error eliminando personal con id ${id} - ${error}`)
            throw new HttpException('Error eliminando personal', HttpStatus.INTERNAL_SERVER_ERROR)
        }
    }
}
