import { Table } from "dexie";
import { ClientDatabase } from "../ClientDatabase.service";
import { ITodoCategory } from "../types";

export class CategoryStore extends ClientDatabase<ITodoCategory> {
  categories!: Table<ITodoCategory>;
  constructor() {
    super();
    this.categories = this.table("categories");
    this.connectTable(this.categories);
  }
}
