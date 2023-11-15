import { Column, Entity, JoinColumn, OneToOne, PrimaryGeneratedColumn } from "typeorm";
import { Alumno } from "./alumno.entity";


@Entity()
export class Asistencia {
    @PrimaryGeneratedColumn()
    id: number;

    @OneToOne(() => Alumno, alumno => alumno.matricula)
    @JoinColumn({name: "alumno_id"})
    alumno_id: Alumno;

    @Column({
        nullable: false
    })
    fecha: Date;
}