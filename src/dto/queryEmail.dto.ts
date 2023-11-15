import { IsEmail, IsNotEmpty } from 'class-validator'

export class QueryEmailDto {

    @IsNotEmpty()
    @IsEmail()
    email: string
}