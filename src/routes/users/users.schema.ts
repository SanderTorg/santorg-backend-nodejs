import { z } from "@hono/zod-openapi";

export const UsersSchema = z.object({
  id: z.string().uuid(),
  name: z.string().min(2).max(100),
  email: z.string().email(),
  age: z.number().min(0).optional(),
});
