import { ITodoItem } from "../../types";
import { ClientDatabase } from "../ClientDatabase.service";
import { Table } from "dexie";

export class TodoStore extends ClientDatabase<ITodoItem> {
  todoItems!: Table<ITodoItem>;
  constructor() {
    super();
    this.todoItems = this.table("todoItems");
    this.connectTable(this.todoItems);
  }
}
