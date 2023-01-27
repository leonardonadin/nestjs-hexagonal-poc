import { PrimaryGeneratedColumn } from 'typeorm';
import { Category } from '../category/category';
import { City } from '../city/city';

export class App {
  @PrimaryGeneratedColumn()
  id: number;
  name: string;
  description: string;
  url: string;
  icon: string;
  categoryId: number;
  category: Category;
  cities: City[];
}
