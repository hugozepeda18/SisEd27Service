import { IsEmail, IsNotEmpty } from 'class-validator'
import { Personal } from 'src/typeorm'

export class CreateUserDto {

    @IsNotEmpty()
    @IsEmail()
    email: string

    @IsNotEmpty()
    password: string

    @IsNotEmpty()
    role: string

    @IsNotEmpty()
    personal_id: Personal

}