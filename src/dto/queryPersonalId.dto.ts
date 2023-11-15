import { IsNotEmpty } from 'class-validator'

export class QueryPersonalIdDto {
    @IsNotEmpty()
    id: number
}