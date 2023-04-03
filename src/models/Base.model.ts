import { BaseSchemaType } from "../schemas/base.schema";
import { uuid } from "../utils/uuid";
export abstract class BaseModel implements BaseSchemaType {
  public id!: string;
  public createdDate!: Date;
  public modifiedDate!: Date;
  constructor() {
    this.id = uuid();
    this.createdDate = new Date();
    this.modifiedDate = new Date();
  }
}
