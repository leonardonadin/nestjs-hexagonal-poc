import { Injectable, Logger } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { App } from "src/domain/app/app";
import { Category } from "src/domain/category/category";
import { City } from "src/domain/city/city";
import { State } from "src/domain/state/state";
import { Repository } from "typeorm";
import { AppEntity } from "./entity/app.entity";
import { CategoryEntity } from "./entity/category.entity";
import { CityEntity } from "./entity/city.entity";
import { StateEntity } from "./entity/state.entity";

@Injectable()
export default class AppRepositoryTypeORM {

    private readonly logger = new Logger(AppRepositoryTypeORM.name);

    constructor(@InjectRepository(AppEntity) private readonly appEntityRepository: Repository<AppEntity>) {}

    async findAll(): Promise<App[]> {
        const appEntityArray: AppEntity[] = await this.appEntityRepository.find();

        const appArray: App[] = appEntityArray.map((appEntity) => {
            return this.mapToApp(appEntity);
        });

        return appArray;
    }

    async save(app: App): Promise<App> {
        const appEntity: AppEntity = this.mapToAppEntity(app);

        const savedAppEntity: AppEntity = await this.appEntityRepository.save(appEntity);

        return this.mapToApp(savedAppEntity);
    }

    private mapToApp(appEntity: AppEntity): App {
        const app: App = new App();
        app.name = appEntity.name;
        app.description = appEntity.description;
        app.icon = appEntity.icon;
        app.url = appEntity.url;

        if (appEntity.category) {
            const category: Category = new Category();
            category.id = appEntity.category.id;
            category.name = appEntity.category.name;
            category.description = appEntity.category.description;
            category.icon = appEntity.category.icon;
            app.category = category;
        }

        if (appEntity.cities) {
            const cityArray: City[] = appEntity.cities.map((cityEntity) => {
                const city: City = new City();
                city.id = cityEntity.id;
                city.name = cityEntity.name;

                const state: State = new State();
                state.id = cityEntity.state.id;
                state.name = cityEntity.state.name;
                state.abbreviation = cityEntity.state.abbreviation;
                city.state = state;

                return city;
            });
            app.cities = cityArray;
        }

        return app;
    }

    private mapToAppEntity(app: App): AppEntity {
        const appEntity: AppEntity = new AppEntity();
        appEntity.name = app.name;
        appEntity.description = app.description;
        appEntity.icon = app.icon;
        appEntity.url = app.url;

        if (app.categoryId) {
            const categoryEntity: CategoryEntity = new CategoryEntity();
            categoryEntity.id = app.category.id;
            categoryEntity.name = app.category.name;
            categoryEntity.description = app.category.description;
            categoryEntity.icon = app.category.icon;
            appEntity.category = categoryEntity;
        }

        if (app.cities) {
            const cityEntityArray: CityEntity[] = app.cities.map((city) => {
                const cityEntity: CityEntity = new CityEntity();
                cityEntity.id = city.id;
                cityEntity.name = city.name;
                
                const stateEntity: StateEntity = new StateEntity();
                stateEntity.id = city.state.id;
                stateEntity.name = city.state.name;
                stateEntity.abbreviation = city.state.abbreviation;
                cityEntity.state = stateEntity;

                return cityEntity;
            });
            appEntity.cities = cityEntityArray;
        }

        return appEntity;
    }
}