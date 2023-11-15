import { IsNotEmpty } from 'class-validator'

export class QueryDocentesDto {
    @IsNotEmpty()
    funsion: string

    @IsNotEmpty()
    turno: string
}