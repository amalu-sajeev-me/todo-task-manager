import { plainToClass } from "class-transformer";
import { IUser } from "../schemas/user.schema";
import { userStore } from "../services/db/hooks/useUsers.hook";
import { uuid } from "../utils/uuid";
import { omitFunctionsInObj } from "../utils/utils";
export class User implements IUser {
  public id: string;
  public createdDate: Date;
  public modifiedDate: Date;
  constructor(
    public firstName: string,
    public lastName: string,
    public age: number,
    public gender: IUser["gender"]
  ) {
    this.id = uuid();
    this.createdDate = new Date();
    this.modifiedDate = new Date();
  }
  static create = async (...params: ConstructorParameters<typeof User>) => {
    const user = new User(...params);
    userStore.add(user, {
      message: `successfully created user ${user.firstName}`,
    });
  };
  static get = async (key: string) => {
    const user = await userStore.get(key);
    if (user) {
      return plainToClass(User, user);
    }
  };
  public get fullName() {
    return `${this.firstName} ${this.lastName || ""}`;
  }
  public save = async () => {
    const data = omitFunctionsInObj({ ...this }) as IUser;
    await userStore.upsert({ ...data });
  };
}
