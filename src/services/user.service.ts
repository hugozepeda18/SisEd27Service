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
        try {
            const users = await this.userRepository.find()
            if (users.length == 0) {
                throw new HttpException('No se encontraron usuarios', HttpStatus.NOT_FOUND)
            }
            return users
        } catch (error) {
            this.logger.error(`Error recuperando usuarios`)
            throw new HttpException('Error recuperando usuarios', HttpStatus.INTERNAL_SERVER_ERROR)   
        }
    }

    async getUserById(id: number) {
        try {
            const user = await this.userRepository.findOne({
                where: {
                    id: id
                }
            })
            if (!user) {
                throw new HttpException('Usuario no encontrado', HttpStatus.NOT_FOUND)
            }
            return user
        } catch (error) {
            this.logger.error(`Error recuperando usuario con id ${id}`)
            throw new HttpException('Error recuperando usuario', HttpStatus.INTERNAL_SERVER_ERROR)   
        }
    }

    async  getUserForLogin(email: string){
        try {
            const user = await this.userRepository.findOne({
                where: {
                    email: email
                }
            })
            if (!user) {
                throw new HttpException('Usuario no encontrado', HttpStatus.NOT_FOUND)
            }
            return user
        } catch (error) {
            this.logger.error(`Error recuperando usuario con email ${email}`)
            throw new HttpException('Error recuperando usuario', HttpStatus.INTERNAL_SERVER_ERROR)
        }
    }

    async updateUser(password: string, id : number){
        const saltOrRounds = 10
        const hashPassword = await bcrypt.hash(password, saltOrRounds)
        try {
            const user = await this.userRepository.findOne({
                where: {
                    id: id
                }
            })
            if (!user) {
                throw new HttpException('Usuario no encontrado', HttpStatus.NOT_FOUND)
            }
            return await this.userRepository.update({
                id
            }, {
                password: hashPassword
            })
        } catch (error) {
            this.logger.error(`Error actualizando contraseña de usuario con id ${id}`)
            throw new HttpException('Error actualizando contraseña', HttpStatus.INTERNAL_SERVER_ERROR)
        }
    }

    async createUser(userDto: CreateUserDto) {
        const saltOrRounds = 10
        const hashPassword = await bcrypt.hash(userDto.password, saltOrRounds)
        userDto.password = hashPassword

        try{
            const newUser = this.userRepository.create(userDto)
            this.logger.log('Usuario creado')
            return await this.userRepository.save(newUser)
        }
        catch (error) {
            this.logger.error(`Nuevo usuario no se pudo crear con error ${error}`)
            throw new HttpException('Error creando alumno', HttpStatus.UNPROCESSABLE_ENTITY)
        }
    }

    async deleteUser(id: number) {
        try {
            const user = await this.userRepository.findOne({
                where: {
                    id: id
                }
            })
            if (!user) {
                throw new HttpException('No se encontró usuario con ese id', HttpStatus.NOT_FOUND)
            }
            return await this.userRepository.delete({id: id});
        } catch (error) {
            this.logger.error(`Error eliminando usuario con id ${id}`)
            throw new HttpException('Error eliminando usuario', HttpStatus.INTERNAL_SERVER_ERROR)
        }
    }
}

