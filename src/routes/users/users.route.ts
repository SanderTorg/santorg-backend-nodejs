import { Hono } from "hono";
import { pool } from "../../db/mySQL/database.js";
import type { Users } from "./users.js";
import { zValidator } from "@hono/zod-validator";
import { UsersSchema } from "./users.schema.js";

const users = new Hono();

users
  .get("/", async (c) => {
    try {
      const [rows] = await pool.execute("SELECT * FROM users");
      let userList = rows as Users[];

      return c.json(userList);
    } catch (error) {
      return c.text(
        (error as Error)?.message || "Failed to fetch all users",
        400
      );
    }
  })
  .get("/:id", async (c) => {
    const { id } = c.req.param();
    try {
      const [rows] = await pool.execute(`SELECT * FROM users WHERE id = ?`, [
        id,
      ]);
      let newUsers = rows as Users[];

      return c.json(newUsers);
    } catch (error) {
      return c.text(
        (error as Error)?.message || "Failed to fetch users by id",
        400
      );
    }
  })
  .post("/", zValidator("form", UsersSchema), async (c) => {
    const { name, email } = await c.req.json();
  });

export default users;
