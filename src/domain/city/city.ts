import { PrimaryGeneratedColumn } from "typeorm";
import { State } from "../state/state";

export class City {
  @PrimaryGeneratedColumn()
  id: number;
  name: string;
  state: State;
}