import { IsNotEmpty } from 'class-validator'

export class QueryIncidenciaIdDto {
    @IsNotEmpty()
    id: number
}