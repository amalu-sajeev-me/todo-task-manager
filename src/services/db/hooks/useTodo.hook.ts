import { TodoStore } from "../stores/Todo.store.service";
export const todoStore = new TodoStore();
export const useTodo = () => {
  return todoStore;
};
