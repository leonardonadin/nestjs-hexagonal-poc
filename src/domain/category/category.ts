import { PrimaryGeneratedColumn } from 'typeorm';
import { App } from '../app/app';

export class Category {
  @PrimaryGeneratedColumn()
  id: number;
  name: string;
  description: string;
  icon: string;
  apps: App[];
}
