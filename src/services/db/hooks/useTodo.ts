import { TodoStore } from "../stores/Todo.store.service";
import { useEffect } from "react";
const todoStoreInstance = new TodoStore();
export const useTodo = () => {
  useEffect(() => {
    console.log("hello world", { todoStoreInstance });
  });
  return todoStoreInstance;
};
