import { App } from "../app/app";

export interface AppRepository {
    findAll(): Promise<App[]>;
    findByName(name: string): Promise<App>;
    save(app: App): Promise<App>;
    delete(app: App): Promise<App>;
}