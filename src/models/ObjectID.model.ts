import { IObjectId } from "../schemas/objectId.schema";

export class ObjectId implements IObjectId {
  constructor(public id: string, public name: string) {}
}
