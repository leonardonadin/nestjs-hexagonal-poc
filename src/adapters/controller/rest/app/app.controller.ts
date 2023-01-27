import { Body, Controller, Get, Inject, Post } from "@nestjs/common";
import { App } from "src/domain/app/app";
import { CreateAppService } from "src/usecase/app/create-app-service";
import { FindAllAppService } from "src/usecase/app/find-all-app-service";
import { ConfigServiceModule } from "../config/config-service.module";

@Controller("app")
export class AppController {

    constructor(
        @Inject(ConfigServiceModule.FIND_ALL_APP_SERVICE) private readonly findAllAppService: FindAllAppService,
        @Inject(ConfigServiceModule.CREATE_APP_SERVICE) private readonly createAppService: CreateAppService
    ) {}

    @Get()
    public findAll(): Promise<App[]> {
        return this.findAllAppService.findAll();
    }

    @Post()
    public createLivro(@Body() app: App): Promise<App> {
        return this.createAppService.create(app);
    }

}