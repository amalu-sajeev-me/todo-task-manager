export interface ITodoItem {
  id: string;
  title: string;
  description: string;
  category: ITodoCategory;
}

export interface ITodoCategory {
  id: string;
  name: string;
}

export interface IUser {
  id: string;
  fullName: string;
}

export interface IDBCallbackOptions {
  message: string;
}
