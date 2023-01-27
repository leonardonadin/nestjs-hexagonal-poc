import { App } from "src/domain/app/app";
import { AppRepository } from "src/domain/ports/app.repository";

export class CreateAppService {
    constructor (private readonly repository: AppRepository) {}

    async create(appDTO: App): Promise<App> {
        return this.repository.save(appDTO);
    }
}