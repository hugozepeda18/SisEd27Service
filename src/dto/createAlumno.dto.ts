import { IsEmail, IsNotEmpty, IsOptional } from "class-validator";

export class CreateAlumnoDto {

    @IsNotEmpty()
    matricula: number

    @IsNotEmpty()
    nombre: string

    @IsNotEmpty()
    apellido_paterno: string

    @IsOptional()
    apellido_materno: string

    @IsOptional()
    curp: string

    @IsOptional()
    grado: number

    @IsNotEmpty()
    grupo: string

    @IsNotEmpty()
    sexo: string

    @IsNotEmpty()
    edad: number

    @IsOptional()
    @IsEmail()
    correo: string

    @IsNotEmpty()
    turno: string

    @IsOptional()
    incidencias: number

    @IsOptional()
    incidencias_graves: number

    @IsOptional()
    incidencias_muy_graves: number
}