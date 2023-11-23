import { Body, Controller, Get, HttpException, HttpStatus, Logger, Post, Put, Query, UseGuards } from '@nestjs/common';
import { UserService } from 'src/services/user.service';
import { CreateUserDto, LoginDto } from 'src/dto';
import { AuthService } from 'src/services/auth.service';
import { QueryEmailDto } from 'src/dto/queryEmail.dto';

@Controller('user')
export class UserController {

    private readonly logger = new Logger(UserController.name)

    constructor(
        private readonly userService: UserService,
        private readonly authService: AuthService
    ) {}

    @Post('signup')
    async createUser(@Body() createUserDto: CreateUserDto) {
        this.logger.log('POST - Registrando usuario nuevo con email ' + createUserDto.email)
        const user = await this.userService.createUser(createUserDto)
        const token = await this.authService.generateToken('1h', user.id.toString(), user.role.toString())
        return {token}
    }

    @Get('email')
    async getUser(@Query() {email}: QueryEmailDto) {
        this.logger.log(`GET - Recuperando usuario con email ${email}`)
        return await this.userService.getUserForLogin(email)
    }

    @Put('password')
    async resetPassword(@Body('password') password: string, @Body('id') id: number) {
        this.logger.log(`PUT - Actualizando contraseña de usuario con id ${id}`)
        return await this.userService.updateUser(password, id)
    }

    @Post('login')
    async signIn(@Body() loginDto: LoginDto) {
        this.logger.log(`POST - Iniciando sesión con email ${loginDto.email}`)
        const user = await this.userService.getUserForLogin(loginDto.email)
        const valid = await this.authService.validateUser(user.password, loginDto);
        if (!valid) throw new HttpException('Contraseña incorrecta', HttpStatus.UNAUTHORIZED)
        const expireAt =  '8h'
        const token = await this.authService.generateToken(expireAt, user.id.toString(), user.role.toString())
        return {token}
    }

}
