import { IsNotEmpty, IsOptional } from "class-validator";


export class QueryAlumnoDto {
    @IsNotEmpty()
    nombre: string

    @IsNotEmpty()
    apellido_paterno: string

    @IsOptional()
    apellido_materno: string
}