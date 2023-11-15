/*Nest & Dependencies*/
import { HttpException, HttpStatus, Injectable, Logger  } from '@nestjs/common';
import * as bcrypt from 'bcrypt';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
/*Self*/
import { Usuario } from 'src/typeorm/usuario.entity';
import { CreateUserDto } from 'src/dto';


@Injectable()
export class UserService {

    private readonly logger = new Logger(UserService.name)

    constructor (
        @InjectRepository(Usuario) private readonly userRepository: Repository<Usuario>
    ) {}

    async getUsers() {
        return await this.userRepository.find();
    }

    async getUserById(userId: number) {
        return await this.userRepository.findOne({
            where: {
                id: userId
            }
        });
    }

    async  getUserForLogin(email: string){
        const user = await this.userRepository.findOne({
            where: {
                email: email
            }
        })
        if (user) return user
        else throw new HttpException('Usuario no encontrado', HttpStatus.NOT_FOUND)
    }

    async updateUser(password: string, id : number){
        const saltOrRounds = 10
        const hashPassword = await bcrypt.hash(password, saltOrRounds)
        return await this.userRepository.update({
            id
        }, {
            password: hashPassword
        })
    }

    async createUser(userDto: CreateUserDto) {
        const saltOrRounds = 10
        const hashPassword = await bcrypt.hash(userDto.password, saltOrRounds)
        userDto.password = hashPassword

        try{
            const user = this.userRepository.create(userDto)
            return await this.userRepository.save(user)
        }
        catch (error) {
            this.logger.error(`Usuario no se pudo crear con error ${error}`)
            throw new HttpException('Error creando alumno', HttpStatus.UNPROCESSABLE_ENTITY)
        }
    }
}

