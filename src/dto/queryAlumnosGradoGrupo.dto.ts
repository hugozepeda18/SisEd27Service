import { IsNotEmpty } from 'class-validator'

export class QueryAlumnosGradoGrupoDto {
    @IsNotEmpty()
    grado: number

    @IsNotEmpty()
    grupo: string

    @IsNotEmpty()
    turno: string

}