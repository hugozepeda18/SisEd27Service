import { IsNotEmpty } from 'class-validator'

export class QueryIncidenciasAlumnoDto {
    @IsNotEmpty()
    matricula: number
}