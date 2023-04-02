import { Length, IsUUID } from "class-validator";
import { ITodoCategory, ITodoItem } from "./types";
import { uuid } from "../utils/uuid";

export class TodoItem implements ITodoItem {
  @IsUUID()
  id!: string;

  @Length(3, 12)
  title!: string;

  @Length(3, 32)
  description!: string;

  category: ITodoCategory;

  constructor(title: string, description: string, category?: ITodoCategory) {
    this.id = uuid();
    this.title = title;
    this.description = description;
    this.category = category || { id: uuid(), name: "todo" };
  }
  public static create(title: string, description: string): TodoItem {
    return new TodoItem(title, description);
  }
}
