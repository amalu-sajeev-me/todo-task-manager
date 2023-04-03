import { z } from "zod";

export const baseSchema = z.object({
  id: z.string().uuid(),
  createdDate: z.date(),
  modifiedDate: z.date(),
});

export type BaseSchemaType = z.infer<typeof baseSchema>;
