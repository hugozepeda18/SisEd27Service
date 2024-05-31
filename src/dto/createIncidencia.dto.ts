import { IsNotEmpty, IsOptional } from "class-validator";
import { Alumno, Personal } from "src/typeorm";

export class CreateIncidenciaDto {

    @IsNotEmpty()
    alumno_id: any;

    @IsNotEmpty()
    fecha: Date;

    @IsNotEmpty()
    descripcion: string;
    
    @IsOptional()
    accion: string;

    @IsOptional()
    aspecto: string;

    @IsNotEmpty()
    personal_id: Personal;

    @IsNotEmpty()
    tipo: number;
}
