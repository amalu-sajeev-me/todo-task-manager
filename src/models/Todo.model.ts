import { ITodo } from "../schemas/todo.schema";
import { todoStore } from "../services/db/hooks/useTodo.hook";
import { BaseModel } from "./Base.model";

export class Todo extends BaseModel implements ITodo {
  constructor(
    public title: string,
    public description: string,
    public category: string
  ) {
    super();
  }
  public static async create(
    ...params: ConstructorParameters<typeof Todo>
  ): Promise<Todo> {
    const todo = new Todo(...params);
    await todoStore.add(todo, {
      message: `Todo ${todo.title} added successfully`,
    });
    return todo;
  }
  public save = async () => {
    const todo = this.plainObject;
    await todoStore.upsert({ ...todo });
  };
}
