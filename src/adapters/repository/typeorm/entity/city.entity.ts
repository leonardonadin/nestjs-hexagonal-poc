import { Column, Entity, ManyToMany, ManyToOne, PrimaryGeneratedColumn } from "typeorm";
import { AppEntity } from "./app.entity";
import { StateEntity } from "./state.entity";

@Entity()
export class CityEntity {

    @PrimaryGeneratedColumn()
    id: number;

    @Column()
    name: string;

    @ManyToOne(type => StateEntity, state => state.cities, { eager: true })
    state: StateEntity;

    @ManyToMany(type => AppEntity, app => app.cities, { eager: true })
    apps: AppEntity[];
}