import { Table } from "dexie";
import { ClientDatabase } from "../ClientDatabase.service";
import { ICategory } from "../../../schemas/category.schema";

export class CategoryStore extends ClientDatabase<ICategory> {
  categories!: Table<ICategory>;
  constructor() {
    super();
    this.categories = this.table("categories");
    this.connectTable(this.categories);
  }
}
