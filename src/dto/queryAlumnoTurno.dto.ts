import { IsNotEmpty } from 'class-validator'

export class QueryAlumnoTurnoDto {

    @IsNotEmpty()
    turno: string

}