import { Body, Controller, Get, HttpException, HttpStatus, Post, Put, Query, UseGuards } from '@nestjs/common';
import { UserService } from 'src/services/user.service';
import { CreateUserDto, LoginDto } from 'src/dto';
import { AuthService } from 'src/services/auth.service';
import { QueryEmailDto } from 'src/dto/queryEmail.dto';
import { HttpErrorByCode } from '@nestjs/common/utils/http-error-by-code.util';

@Controller('user')
export class UserController {

    constructor(
        private readonly userService: UserService,
        private readonly authService: AuthService
    ) {}

    @Post('signup')
    async createUser(@Body() createUserDto: CreateUserDto) {
        const user = await this.userService.createUser(createUserDto)
        const token = await this.authService.generateToken('1h', user.id.toString(), user.role.toString())
        return {token}
    }

    @Get('email')
    async getUser(@Query() {email}: QueryEmailDto) {
        const user = await this.userService.getUserForLogin(email)
        return user
    }

    @Put('password')
    async resetPassword(@Body('password') password: string, @Body('id') id: number) {
        return await this.userService.updateUser(password, id)
    }

    @Post('login')
    async signIn(@Body() loginDto: LoginDto) {
        const user = await this.userService.getUserForLogin(loginDto.email)
        const valid = await this.authService.validateUser(user.password, loginDto);
        if (!valid) throw new HttpException('Contraseña incorrecta', HttpStatus.UNAUTHORIZED)
        const expireAt =  '8h'
        const token = await this.authService.generateToken(expireAt, user.id.toString(), user.role.toString())
        return {token}
    }

}
