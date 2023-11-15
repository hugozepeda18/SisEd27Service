import { Column, Entity, PrimaryColumn } from 'typeorm';

@Entity()
export class Alumno {
  @PrimaryColumn()
  matricula: number;

  @Column({
    nullable: false
  })
  nombre: string;

  @Column({
    nullable: false
  })
  apellido_paterno: string;

  @Column({
    nullable: true
  })
  apellido_materno: string;

  @Column({
    nullable: true
  })
  curp: string;

  @Column({
    nullable: true
  })
  grado: number;

  @Column({
    nullable: false
  })
  grupo: string;

  @Column({
    nullable: false
  })
  sexo: string;

  @Column({
    nullable: false
  })
  edad: number;

  @Column({
    nullable: true
  })
  correo: string;

  @Column({
    nullable: false
  })
  turno: string;

  @Column({
    nullable: false
  })
  incidencias: number;

  @Column({
    nullable: false
  })
  incidencias_graves: number;

  @Column({
    nullable: false
  })
  incidencias_muy_graves: number;
}