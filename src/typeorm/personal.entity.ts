import { Column, Entity, PrimaryColumn, PrimaryGeneratedColumn } from 'typeorm';

@Entity()
export class Personal {
    @PrimaryGeneratedColumn()
    id: number;

    @Column({
        nullable: false
    })
    nombre_completo: string;

    @Column({
        nullable: false
    })
    funsion: string;

    @Column({
        nullable: false
      })
    turno: string;
}