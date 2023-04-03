import { Table } from "dexie";
import { ClientDatabase } from "../ClientDatabase.service";
import { IUser } from "../types";

export class UserStore extends ClientDatabase<IUser> {
  users!: Table<IUser>;
  constructor() {
    super();
    this.connectTable(this.users);
  }
}
