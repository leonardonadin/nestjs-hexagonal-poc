import { PrimaryGeneratedColumn } from "typeorm";
import { City } from "../city/city";

export class State {
  @PrimaryGeneratedColumn()
  id: number;
  name: string;
  abbreviation: string;
  cities: City[];
}