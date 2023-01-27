import { Category } from '../category/category';

export interface CategoryRepository {
  findAll(): Promise<Category[]>;
  findByName(name: string): Promise<Category>;
  save(category: Category): Promise<Category>;
  delete(category: Category): Promise<Category>;
}
