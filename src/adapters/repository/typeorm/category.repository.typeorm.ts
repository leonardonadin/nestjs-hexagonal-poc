import { Injectable, Logger } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { Category } from "src/domain/category/category";
import { Repository } from "typeorm";
import { CategoryEntity } from "./entity/category.entity";

@Injectable()
export default class CategoryRepositoryTypeORM {

    private readonly logger = new Logger(CategoryRepositoryTypeORM.name);

    constructor(@InjectRepository(CategoryEntity) private readonly categoryEntityRepository: Repository<CategoryEntity>) {}

    async findAll(): Promise<Category[]> {
        const categoryEntityArray: CategoryEntity[] = await this.categoryEntityRepository.find();

        const categoryArray: Category[] = categoryEntityArray.map((categoryEntity) => {
            return this.mapToCategory(categoryEntity);
        });

        return categoryArray;
    }

    async save(category: Category): Promise<Category> {
        const categoryEntity: CategoryEntity = this.mapToCategoryEntity(category);

        const savedCategoryEntity: CategoryEntity = await this.categoryEntityRepository.save(categoryEntity);

        return this.mapToCategory(savedCategoryEntity);
    }

    private mapToCategory(categoryEntity: CategoryEntity): Category {
        const category: Category = new Category();
        category.name = categoryEntity.name;
        category.description = categoryEntity.description;
        category.icon = categoryEntity.icon;

        return category;
    }

    private mapToCategoryEntity(category: Category): CategoryEntity {
        const categoryEntity: CategoryEntity = new CategoryEntity();
        categoryEntity.name = category.name;
        categoryEntity.description = category.description;
        categoryEntity.icon = category.icon;

        return categoryEntity;
    }
}