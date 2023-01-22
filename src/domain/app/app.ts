import { Category } from '../category/category';
import { City } from '../city/city';

export class App {
  id: number;
  name: string;
  description: string;
  url: string;
  icon: string;
  category: Category;
  cities: City[];
}
