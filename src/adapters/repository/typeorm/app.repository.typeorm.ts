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
        app.id = appEntity.id;
        app.name = appEntity.name;
        app.description = appEntity.description;
        app.icon = appEntity.icon;

        app.category = new Category();
        app.category.name = appEntity.category.name;
        app.category.description = appEntity.category.description;

        app.cities = appEntity.cities.map((cityEntity) => {
            const city = new City();
            city.name = cityEntity.name;
            city.state = new State();
            city.state.name = cityEntity.state.name;
            city.state.abbreviation = cityEntity.state.abbreviation;
            return city;
        });

        return app;
    }

    private mapToAppEntity(app: App): AppEntity {
        const appEntity: AppEntity = new AppEntity();
        appEntity.id = app.id;
        appEntity.name = app.name;
        appEntity.description = app.description;
        appEntity.icon = app.icon;

        appEntity.category = new CategoryEntity();
        appEntity.category.name = app.category.name;
        appEntity.category.description = app.category.description;

        appEntity.cities = app.cities.map((city) => {
            const cityEntity = new CityEntity();
            cityEntity.name = city.name;
            cityEntity.state = new StateEntity();
            cityEntity.state.name = city.state.name;
            cityEntity.state.abbreviation = city.state.abbreviation;
            return cityEntity;
        });

        return appEntity;
    }
}