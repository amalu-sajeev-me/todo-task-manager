import Dexie from "dexie";
import { ITodoCategory, ITodoItem } from "./types";
import { APP_DB_VERSION } from "./constants";

export class Todo extends Dexie {
  todoItems!: Dexie.Table<ITodoItem>;
  categories!: Dexie.Table<ITodoCategory>;
  constructor() {
    super("todoList");
    this.version(APP_DB_VERSION).stores({
      todoItems: "++id, &title, description",
      categories: "++id, &title",
    });
  }
  public static db = new Todo();
}
