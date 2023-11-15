import { IsNotEmpty } from 'class-validator'

export class DeletePersonalDto {
    @IsNotEmpty()
    id: number
}