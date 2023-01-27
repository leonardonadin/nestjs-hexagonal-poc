import { DynamicModule, Module } from "@nestjs/common";
import AppRepositoryTypeORM from "src/adapters/repository/typeorm/app.repository.typeorm";
import CategoryRepositoryTypeORM from "src/adapters/repository/typeorm/category.repository.typeorm";
import TypeORMConfigModule from "src/adapters/repository/typeorm/config/typeorm-config.module";
import { AppRepository } from "src/domain/ports/app.repository";
import { CategoryRepository } from "src/domain/ports/category.repository";
import { CreateAppService } from "src/usecase/app/create-app-service";
import { FindAllAppService } from "src/usecase/app/find-all-app-service";
import { CreateCategoryService } from "src/usecase/category/create-category-service";
import { FindAllCategoryService } from "src/usecase/category/find-all-category-service";

@Module({
    imports: [
        TypeORMConfigModule
    ]
})
export class ConfigServiceModule {

    static FIND_ALL_APP_SERVICE: string = "FindAllAppService";
    static CREATE_APP_SERVICE: string = "CreateAppService";

    static FIND_ALL_CATEGORY_SERVICE: string = "FindAllCategoryService";
    static CREATE_CATEGORY_SERVICE: string = "CreateCategoryService";

    static register(): DynamicModule {
        return {
          module: ConfigServiceModule,
          providers: [
            {
              inject: [AppRepositoryTypeORM],
              provide: ConfigServiceModule.FIND_ALL_APP_SERVICE,
              useFactory: (appRepository: AppRepository) =>
                new FindAllAppService(appRepository),
            },
            {
              inject: [AppRepositoryTypeORM],
              provide: ConfigServiceModule.CREATE_APP_SERVICE,
              useFactory: (appRepository: AppRepository) =>
                new CreateAppService(appRepository),
            },
            {
              inject: [CategoryRepositoryTypeORM],
              provide: ConfigServiceModule.FIND_ALL_CATEGORY_SERVICE,
              useFactory: (categoryRepository: CategoryRepository) =>
                new FindAllCategoryService(categoryRepository),
            },
            {
              inject: [CategoryRepositoryTypeORM],
              provide: ConfigServiceModule.CREATE_CATEGORY_SERVICE,
              useFactory: (categoryRepository: CategoryRepository) =>
                new CreateCategoryService(categoryRepository),
            },
          ],
          exports: [
            ConfigServiceModule.FIND_ALL_APP_SERVICE,
            ConfigServiceModule.CREATE_APP_SERVICE,
            ConfigServiceModule.FIND_ALL_CATEGORY_SERVICE,
            ConfigServiceModule.CREATE_CATEGORY_SERVICE,
          ],
        };
    }
}