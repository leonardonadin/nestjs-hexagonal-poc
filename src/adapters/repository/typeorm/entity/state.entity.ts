import { Column, Entity, OneToMany, PrimaryGeneratedColumn } from 'typeorm';
import { CityEntity } from './city.entity';

@Entity()
export class StateEntity {
  @PrimaryGeneratedColumn('increment')
  id: number;

  @Column()
  name: string;

  @Column()
  abbreviation: string;

  @OneToMany((type) => CityEntity, (city) => city.state, { cascade: true })
  cities: CityEntity[];
}
