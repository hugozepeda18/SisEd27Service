import { IsNotEmpty } from 'class-validator'

export class QueryAlumnosGradoDto {
    @IsNotEmpty()
    grado: number

    @IsNotEmpty()
    turno: string

}