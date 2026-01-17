import games from "./routes/games/games.route.js";
import { Hono } from "hono";
import films from "./routes/movies/movies.route.js";
import users from "./routes/users/users.route.js";

export const BASE_URL = "/api/v2";
export const app = new Hono().basePath(BASE_URL);

app.get("/", (c) => {
  return c.text("API is running");
});

app.route("/movies", films).route("/games", games).route("/users", users);

export type AppType = typeof app;
