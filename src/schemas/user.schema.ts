import { z } from "zod";
import { baseSchema } from "./base.schema";

export const userSchema = z
  .object({
    firstName: z.string().min(3).max(12),
    lastName: z.string().min(3).max(12),
    age: z.number().min(0).optional(),
    gender: z.enum(["male", "female", "other"]),
  })
  .extend(baseSchema.shape);

export type IUser = z.infer<typeof userSchema>;
