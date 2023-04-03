import Dexie from "dexie";
import { IObjectId } from "../schemas/objectId.schema";
import { ITodo, ITodoPopulated } from "../schemas/todo.schema";
import { categoryStore } from "../services/db/hooks/useCategory.hook";
import { todoStore } from "../services/db/hooks/useTodo.hook";
import { BaseModel } from "./Base.model";

export class Todo extends BaseModel implements ITodo {
  constructor(
    public title: string,
    public description: string,
    public category: IObjectId
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
  public static populated = async () => {
    const todos = await todoStore.todoItems.toArray();
    return Promise.all(
      todos.map(async ({ category, ...todo }) => {
        const newTodo: Partial<ITodoPopulated> = { ...todo };
        const newCategory = await categoryStore.get(category.id);
        newTodo.category = newCategory;
        return newTodo as ITodoPopulated;
      })
    );
  };

  public static fetchAll() {
    return this.populated();
  }
}
