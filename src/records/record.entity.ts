import { Column, Entity } from "typeorm";
import { PrimaryGeneratedColumn } from "typeorm";
import { ProjectModeTypes } from "src/data/project-mode-types";

@Entity()
export class Record {
    @PrimaryGeneratedColumn('uuid')
    id: string;

    @Column({
        type: "enum",
        enum: ProjectModeTypes
    })
    type: ProjectModeTypes

    @Column()
    kloc: number

    @Column({ type: 'json' })
    adt_atr: any;

    @Column()
    fingerprint: string;

    @Column({ type: 'timestamp', default: () => 'CURRENT_TIMESTAMP' })
    creating_date: Date;
}