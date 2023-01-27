import { Category } from "src/domain/category/category";
import { CategoryRepository } from "src/domain/ports/category.repository";

export class FindAllCategoryService {
    constructor(private readonly repository: CategoryRepository) {}

    async findAll(): Promise<Category[]> {
        return this.repository.findAll();
    }
}