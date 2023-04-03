import { TodoStore } from "../stores/Todo.store.service";
import { useEffect } from "react";
export const todoStore = new TodoStore();
export const useTodo = () => {
  return todoStore;
};
