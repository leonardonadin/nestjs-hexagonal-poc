import { Body, Controller, Get, Inject, Post } from "@nestjs/common";
import { Category } from "src/domain/category/category";
import { CreateCategoryService } from "src/usecase/category/create-category-service";
import { FindAllCategoryService } from "src/usecase/category/find-all-category-service";
import { ConfigServiceModule } from "../config/config-service.module";

@Controller("category")
export class CategoryController {

    constructor(
        @Inject(ConfigServiceModule.FIND_ALL_CATEGORY_SERVICE) private readonly findAllCategoryService: FindAllCategoryService,
        @Inject(ConfigServiceModule.CREATE_CATEGORY_SERVICE) private readonly createCategoryService: CreateCategoryService
    ) {}

    @Get()
    public findAll(): Promise<Category[]> {
        return this.findAllCategoryService.findAll();
    }

    @Post()
    public store(@Body() category: Category): Promise<Category> {
        return this.createCategoryService.create(category);
    }

}