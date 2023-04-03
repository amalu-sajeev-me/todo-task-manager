import { BaseSchemaType } from "../schemas/base.schema";
import { omitFunctionsInObj } from "../utils/utils";
import { uuid } from "../utils/uuid";
export abstract class BaseModel implements BaseSchemaType {
  public id!: string;
  public createdDate!: Date;
  public modifiedDate!: Date;
  public abstract save: () => void;
  constructor() {
    this.id = uuid();
    this.createdDate = new Date();
    this.modifiedDate = new Date();
  }
  public get plainObject() {
    return omitFunctionsInObj(this) as typeof this;
  }
}
