import { z } from "zod";
import { ObjectId } from "../models/ObjectID.model";

export const objectIdSchema = z.instanceof(ObjectId);

export type IObjectId = z.infer<typeof objectIdSchema>;
