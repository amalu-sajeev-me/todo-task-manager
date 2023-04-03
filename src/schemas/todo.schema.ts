import { z } from "zod";
import { baseSchema } from "./base.schema";

export const todoSchema = z
  .object({
    title: z.string().min(3).max(32),
    description: z.string().min(3).max(132).optional(),
  })
  .extend(baseSchema.shape);

export type ITodo = z.infer<typeof todoSchema>;