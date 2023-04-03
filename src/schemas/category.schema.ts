import { z } from "zod";
import { baseSchema } from "./base.schema";

export const categorySchema = z
  .object({
    categoryName: z.string().min(3).max(12),
    orderIndex: z.number().int().optional(),
  })
  .extend(baseSchema.shape);

export type ICategory = z.infer<typeof categorySchema>;
