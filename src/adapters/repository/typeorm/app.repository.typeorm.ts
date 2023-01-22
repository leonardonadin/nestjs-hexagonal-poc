import { Injectable, Logger } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { App } from "src/domain/app/app";
import { Repository } from "typeorm";
import { AppEntity } from "./entity/app.entity";

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
        app.category = appEntity.category;
        app.cities = appEntity.cities;
        return app;
    }

    private mapToAppEntity(app: App): AppEntity {
        const appEntity: AppEntity = new AppEntity();
        appEntity.id = app.id;
        appEntity.name = app.name;
        appEntity.description = app.description;
        appEntity.icon = app.icon;
        appEntity.category = app.category;
        appEntity.cities = app.cities;
        return appEntity;
    }
}