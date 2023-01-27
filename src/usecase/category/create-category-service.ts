import { Category } from "src/domain/category/category";
import { CategoryRepository } from "src/domain/ports/category.repository";

export class CreateCategoryService {
    constructor (private readonly repository: CategoryRepository) {}

    async create(categoryDTO: Category): Promise<Category> {
        return this.repository.save(categoryDTO);
    }
}