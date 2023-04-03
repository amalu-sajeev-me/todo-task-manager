import { ITodo } from "../../../schemas/todo.schema";
import { ITodoItem } from "../../types";
import { ClientDatabase } from "../ClientDatabase.service";
import { Table } from "dexie";

export class TodoStore extends ClientDatabase<ITodo> {
  todoItems!: Table<ITodo>;
  constructor() {
    super();
    this.todoItems = this.table("todoItems");
    this.connectTable(this.todoItems);
  }
}
