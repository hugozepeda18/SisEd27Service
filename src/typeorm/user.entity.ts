import { Column, Entity, JoinColumn, OneToOne, PrimaryGeneratedColumn } from "typeorm";
import { Personal } from "./personal.entity";


@Entity()
export class User {
    @PrimaryGeneratedColumn()
    id: number;

    @Column({
        nullable: false
    })
    email: string;

    @Column({
        nullable: false
    })
    password: string;

    @Column({
        nullable: false
    })
    role: string;

    @OneToOne(() => Personal, personal => personal.id)
    @JoinColumn({name: "personal_id"})
    personal_id: Personal;

}