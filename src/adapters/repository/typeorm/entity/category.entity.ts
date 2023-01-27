import { Column, Entity, OneToMany, PrimaryGeneratedColumn } from 'typeorm';
import { AppEntity } from './app.entity';

@Entity()
export class CategoryEntity {
  @PrimaryGeneratedColumn('increment')
  id: number;

  @Column()
  name: string;

  @Column({ nullable: true })
  description: string;

  @Column({ nullable: true })
  icon: string;

  @OneToMany((type) => AppEntity, (app) => app.category, { eager: true })
  apps: AppEntity[];
}
