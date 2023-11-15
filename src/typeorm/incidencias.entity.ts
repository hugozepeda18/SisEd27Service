import { Column, Entity, JoinColumn, OneToOne, OneToMany, ManyToOne, PrimaryGeneratedColumn } from "typeorm";
import { Personal } from "./personal.entity";
import { Alumno } from "./alumno.entity";

@Entity()
export class Incidencias {
    @PrimaryGeneratedColumn()
    id: number;

    @OneToOne(() => Alumno, alumno => alumno.matricula)
    @JoinColumn({name: "alumno_id"})
    alumno_id: Alumno;

    @Column({
        nullable: false
    })
    fecha: Date;

    @Column({
        nullable: false
    })
    descripcion: string;

    @Column({
        nullable: true
    })
    accion: string;

    @Column({
        nullable: true
    })
    aspecto: string;

    @OneToOne(() => Personal, personal => personal.id)
    @JoinColumn({name: "personal_id"})
    personal_id: Personal;

    @Column({
        nullable: false
    })
    tipo: number;

}