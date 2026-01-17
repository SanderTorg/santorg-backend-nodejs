import { z } from "@hono/zod-openapi";

export const MetaSchema = z.object({
  total: z.number().int().nonnegative(),
  limit: z.number().int().nonnegative(),
  skip: z.number().int().nonnegative(),
});
