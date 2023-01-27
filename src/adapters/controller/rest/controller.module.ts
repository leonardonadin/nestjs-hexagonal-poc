import { Module } from "@nestjs/common";
import { AppController } from "./app/app.controller";
import { CategoryController } from "./category/category.controller";
import { ConfigServiceModule } from "./config/config-service.module";

@Module({
    imports: [
        ConfigServiceModule.register()
    ],
    controllers: [
        AppController,
        CategoryController
    ],
})
export class ControllerModule {}