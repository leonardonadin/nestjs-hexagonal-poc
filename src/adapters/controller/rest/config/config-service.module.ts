import { DynamicModule, Module } from "@nestjs/common";
import AppRepositoryTypeORM from "src/adapters/repository/typeorm/app.repository.typeorm";
import TypeORMConfigModule from "src/adapters/repository/typeorm/config/typeorm-config.module";
import { CreateAppService } from "src/usecase/create-app-service";
import { FindAllAppService } from "src/usecase/find-all-app-service";

@Module({
    imports: [
        TypeORMConfigModule
    ]
})
export class ConfigServiceModule {

    static FIND_ALL_APP_SERVICE: string = "FindAllAppService";
    static CREATE_APP_SERVICE: string = "CreateAppService";

    static register(): DynamicModule {
        return {
            module: ConfigServiceModule,
            providers: [
                {
                    inject: [ AppRepositoryTypeORM ],
                    provide: ConfigServiceModule.FIND_ALL_APP_SERVICE,
                    useFactory: (appRepository: AppRepositoryTypeORM) => new FindAllAppService(appRepository)
                },
                {
                    inject: [ AppRepositoryTypeORM ],
                    provide: ConfigServiceModule.CREATE_APP_SERVICE,
                    useFactory: (appRepository: AppRepositoryTypeORM) => new CreateAppService(appRepository)
                }
            ],
            exports: [
                ConfigServiceModule.FIND_ALL_APP_SERVICE,
                ConfigServiceModule.CREATE_APP_SERVICE
            ]
        }
    }
}