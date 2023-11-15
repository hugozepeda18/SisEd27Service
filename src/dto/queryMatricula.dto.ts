import { IsNotEmpty } from 'class-validator'

export class QueryMatriculaDto {
    @IsNotEmpty()
    matricula: number
}