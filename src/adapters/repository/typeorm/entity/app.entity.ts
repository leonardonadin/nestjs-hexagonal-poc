import {
  Column,
  Entity,
  JoinTable,
  ManyToMany,
  ManyToOne,
  PrimaryGeneratedColumn,
} from 'typeorm';
import { CategoryEntity } from './category.entity';
import { CityEntity } from './city.entity';

@Entity()
export class AppEntity {
  @PrimaryGeneratedColumn('increment')
  id: number;

  @Column()
  name: string;

  @Column({ nullable: true })
  description: string;

  @Column()
  url: string;

  @Column({ nullable: true })
  icon: string;

  @ManyToMany((type) => CityEntity, (city) => city.apps, { eager: true })
  @JoinTable({
    name: 'app_city',
    joinColumn: {
      name: 'app_id',
      referencedColumnName: 'id',
    },
    inverseJoinColumn: {
      name: 'city_id',
      referencedColumnName: 'id',
    },
  })
  cities: CityEntity[];

  @ManyToOne((type) => CategoryEntity, (category) => category.apps)
  category: CategoryEntity;
}
