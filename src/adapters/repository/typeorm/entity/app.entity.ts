import {
  Column,
  Entity,
  ManyToMany,
  ManyToOne,
  PrimaryGeneratedColumn,
} from 'typeorm';
import { CategoryEntity } from './category.entity';
import { CityEntity } from './city.entity';

@Entity()
export class AppEntity {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  name: string;

  @Column()
  description: string;

  @Column()
  url: string;

  @Column()
  icon: string;

  @ManyToMany((type) => CityEntity, (city) => city.apps, { eager: true })
  cities: CityEntity[];

  @ManyToOne((type) => CategoryEntity, (category) => category.apps, {
    eager: true,
  })
  category: CategoryEntity;
}
