import { Hono } from "hono";

const films = new Hono();

interface Movie {
  id: string | number;
  title: string;
  director: string;
  releaseYear: number;
  genre: string;
  rating?: number;
}

const movies: Movie[] = [
  {
    id: "1",
    title: "Inception",
    director: "Christopher Nolan",
    releaseYear: 2010,
    genre: "Sci-Fi",
    rating: 8.8,
  },
  {
    id: "2",
    title: "The Dark Knight",
    director: "Christopher Nolan",
    releaseYear: 2008,
    genre: "Action",
    rating: 9.0,
  },
  {
    id: "3",
    title: "Interstellar",
    director: "Christopher Nolan",
    releaseYear: 2014,
    genre: "Sci-Fi",
    rating: 8.6,
  },
  {
    id: "4",
    title: "Pulp Fiction",
    director: "Quentin Tarantino",
    releaseYear: 1994,
    genre: "Crime",
    rating: 8.9,
  },
];

films
  .get(`/`, (c) => {
    return c.json(movies);
  })
  .get(`/:id`, (c) => {
    const id = c.req.param("id");
    const foundMovie = movies.find((movies) => movies.id === id);
    if (!foundMovie) {
      return c.json({
        error: {
          message: "Did not find the movie",
          url: `/movies/:id`,
        },
      });
    }
    return c.json(foundMovie);
  });

export default films;
