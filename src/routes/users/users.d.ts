import type z from "zod";
import type { UsersSchema } from "./users.schema.ts";

export type Users = z.infer<typeof UsersSchema>;
export type UsersResponse = z.infer<typeof UsersSchema>;
