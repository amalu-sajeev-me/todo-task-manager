import Dexie from "dexie";
import { ITodoCategory, ITodoItem, IUser } from "./types";
import { APP_DB_VERSION } from "./constants";

export class Todo extends Dexie {
  todoItems!: Dexie.Table<ITodoItem>;
  categories!: Dexie.Table<ITodoCategory>;
  users!: Dexie.Table<IUser>;
  constructor() {
    super("todoList");
    this.version(APP_DB_VERSION).stores({
      todoItems: "++id, &title, description",
      categories: "++id, &title",
      users: "++id, &fullName",
    });
  }
  public static db = new Todo();
}
