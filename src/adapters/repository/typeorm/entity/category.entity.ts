import { Column, Entity, OneToMany, PrimaryGeneratedColumn } from "typeorm";
import { AppEntity } from "./app.entity";

@Entity()
export class CategoryEntity {

    @PrimaryGeneratedColumn()
    id: number;

    @Column()
    name: string;

    @Column()
    description: string;

    @Column()
    icon: string;

    @OneToMany(type => AppEntity, app => app.category, { eager: true })
    apps: AppEntity[];
}