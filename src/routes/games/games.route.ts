import { Hono } from "hono";
import gamesList from "./games.js";
import type { Games } from "./games.js";

const games = new Hono();

games
  .get("/", (c) => {
    return c.text("Games endpoint is running");
  })

  .get(`/games`, (c) => {
    const genre = c.req.query("genre");
    const maxPrice = c.req.query("maxPrice");
    const year = c.req.query("year");
    const sort = c.req.query("sort");

    let filteredGames = [...gamesList];

    if (genre) {
      filteredGames = filteredGames.filter(
        (game) => game.genre.toLowerCase() === genre.toLowerCase()
      );
    }

    if (maxPrice) {
      filteredGames = filteredGames.filter(
        (game) => (game.price || 0) <= parseFloat(maxPrice)
      );
    }

    if (year) {
      filteredGames = filteredGames.filter(
        (game) => game.releaseYear === Number(year)
      );
    }

    if (sort === "rating") {
      filteredGames.sort((a, b) => (b.rating || 0) - (a.rating || 0));
    }

    return c.json(filteredGames);
  })
  .get(`/:id`, (c) => {
    const id = c.req.param("id");
    const foundGame = gamesList.find((game) => game.id === id);
    if (!foundGame) {
      return c.json(
        {
          error: {
            message: "Not found",
            url: `/games/:id`,
          },
        },
        404
      );
    }

    return c.json(foundGame);
  })
  .get(`/genre/:genre`, (c) => {
    const genre: string = c.req.param("genre");
    const releaseYear: number = Number(c.req.query("releaseYear"));

    let filteredGames = gamesList;

    if (genre) {
      filteredGames = filteredGames.filter(
        (game) => game.genre.toLowerCase() === genre.toLowerCase()
      );
    }

    if (releaseYear) {
      filteredGames = filteredGames.filter(
        (game) => game.releaseYear === releaseYear
      );
    }

    return c.json(filteredGames);
  });

function filterByGenre(genre: string): Games[] {
  return gamesList.filter(
    (game) => game.genre.toLowerCase() === genre.toLowerCase()
  );
}

function filterByMaxPrice(maxPrice: number): Games[] {
  return gamesList.filter((game) => (game.price || 0) <= maxPrice);
}

function filterByReleaseYear(releaseYear: number): Games[] {
  return gamesList.filter((game) => game.releaseYear === releaseYear);
}

function sortByRating(gamesList: Games[]): Games[] {
  return gamesList.sort((a, b) => (b.rating || 0) - (a.rating || 0));
}

export default games;
