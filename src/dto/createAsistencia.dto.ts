import { IsNotEmpty } from "class-validator";
import { Alumno } from "src/typeorm";


export class CreateAsistenciaDto {

    @IsNotEmpty()
    alumno_id: Alumno;

    @IsNotEmpty()
    fecha: Date;
}