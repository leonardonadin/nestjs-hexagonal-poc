import { App } from "src/domain/app/app";
import { AppRepository } from "src/domain/ports/app.repository";

export class FindAllAppService {
    constructor(private readonly repository: AppRepository) {}

    async findAll(): Promise<App[]> {
        return this.repository.findAll();
    }
}