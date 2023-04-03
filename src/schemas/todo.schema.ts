import { z } from "zod";
import { baseSchema } from "./base.schema";
import { objectIdSchema } from "./objectId.schema";
import { categorySchema } from "./category.schema";

export const todoSchema = z
  .object({
    title: z.string().min(3).max(32),
    category: objectIdSchema,
    description: z.string().min(3).max(132).optional(),
  })
  .extend(baseSchema.shape);

export const todoPopulatedSchema = todoSchema.merge(
  z.object({ category: categorySchema })
);
export type ITodo = z.infer<typeof todoSchema>;
export type ITodoPopulated = z.infer<typeof todoPopulatedSchema>;
