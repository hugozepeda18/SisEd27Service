import { IsNotEmpty } from "class-validator";

export class CreatePersonalDto {

    @IsNotEmpty()
    nombre_completo: string;

    @IsNotEmpty()
    funsion: string;

    @IsNotEmpty()
    turno: string;

}