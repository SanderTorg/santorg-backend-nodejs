import { Hono } from "hono";

const games = new Hono();
const BASE_URL = "/api/v3";

games.get("/", (c) => {
  return c.text("Games endpoint is running");
});

export default games;
