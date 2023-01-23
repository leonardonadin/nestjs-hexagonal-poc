import { Module } from "@nestjs/common";
import { TypeOrmModule } from "@nestjs/typeorm";
import AppRepositoryTypeORM from "../app.repository.typeorm";
import { AppEntity } from "../entity/app.entity";
import { CategoryEntity } from "../entity/category.entity";
import { CityEntity } from "../entity/city.entity";
import { StateEntity } from "../entity/state.entity";

@Module({
    imports: [
        TypeOrmModule.forRoot({
            "type": "mysql",
            "host": "localhost",
            "port": 3306,
            "username": "root",
            "password": "root",
            "database": "app-api",
            "entities": ["dist/**/*.entity{.ts,.js}"],
            "synchronize": true,
            "autoLoadEntities": true
        }),
        TypeOrmModule.forFeature([
            AppEntity,
            CategoryEntity,
            CityEntity,
            StateEntity
        ])
    ],
    providers: [
        AppRepositoryTypeORM,
    ],
    exports: [
        AppRepositoryTypeORM,
    ]
})
export default class TypeORMConfigModule {}