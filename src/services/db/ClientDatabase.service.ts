import Dexie, { IndexableType, Table } from "dexie";
import { EnqueueSnackbar, enqueueSnackbar } from "notistack";
import {
  APP_DB_VERSION,
  CATEGORIES_STORE_INDICES,
  TODO_STORE_INDICES,
  USERS_STORE_INDICES,
} from "./constants";
import { IDBCallbackOptions } from "./types";

export abstract class ClientDatabase<
  TModel,
  TKey = IndexableType
> extends Dexie {
  public tableName!: Table<TModel, TKey>;
  public static storeSchemas: Record<string, string[]> = {
    users: USERS_STORE_INDICES,
    categories: CATEGORIES_STORE_INDICES,
    todoItems: TODO_STORE_INDICES,
  };

  constructor() {
    super("todoList");
    this.__defineModelSchema();
  }
  private __defineModelSchema(): void {
    const schema: Record<string, string> = {};
    Object.entries(ClientDatabase.storeSchemas).forEach(([store, indexes]) => {
      schema[store] = indexes.join();
    });
    this.version(APP_DB_VERSION).stores(schema);
  }
  protected connectTable(table: Table<TModel, TKey>) {
    this.tableName = table;
  }
  protected enqueueSnackbar = (...params: Parameters<EnqueueSnackbar>) => {
    enqueueSnackbar(...params);
  };
  public add = async (
    model: TModel,
    options = {} as IDBCallbackOptions,
    key?: TKey
  ) => {
    const { message } = options;
    await this.tableName
      .add(model, key)
      .then(() => {
        this.enqueueSnackbar(message, { variant: "success" });
      })
      .catch(this.handleError);
    return this;
  };
  public handleError(error: unknown): void {
    console.error("error", error);
    this.enqueueSnackbar(
      error instanceof Error ? error.message : (error as string),
      { variant: "error" }
    );
  }
}
