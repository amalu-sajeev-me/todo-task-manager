import { z } from "zod";

export const userSchema = z.object({
  id: z.string().uuid(),
  firstName: z.string().min(3).max(12),
  lastName: z.string().min(3).max(12),
  age: z.number().min(0).optional(),
  gender: z.enum(["male", "female", "other"]),
  createdDate: z.date(),
  modifiedDate: z.date(),
});

export type IUser = z.infer<typeof userSchema>;
