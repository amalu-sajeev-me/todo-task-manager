import { Table } from "dexie";
import { ClientDatabase } from "../ClientDatabase.service";
import { IUser } from "../../../schemas/user.schema";

export class UserStore extends ClientDatabase<IUser> {
  users!: Table<IUser>;
  constructor() {
    super();
    this.users = this.table("users");
    this.connectTable(this.users);
  }
}
