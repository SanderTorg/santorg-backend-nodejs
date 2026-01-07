import { serve } from "@hono/node-server";
import { Hono } from "hono";

const app = new Hono();
const BASE_URL = "/api/v2";

serve(
  {
    fetch: app.fetch,
    port: 3000,
  },
  (info) => {
    console.log(
      `Server is running on http://localhost:${info.port}${BASE_URL}`
    );
  }
);

app.get(`${BASE_URL}`, (c) => {
  return c.text("Legendary API v2 is running");
});

interface Product {
  id: string | number;
  name: string;
  price: number;
  inStock: boolean;
}

const products: Product[] = [
  { id: "1", name: "Laptop", price: 999.99, inStock: true },
  { id: "2", name: "Smartphone", price: 499.99, inStock: false },
  { id: "3", name: "Tablet", price: 299.99, inStock: true },
];

// Path Parameter
app.get(`${BASE_URL}/products/:id`, (c) => {
  const id = c.req.param("id");
  const foundProduct = products.find((product) => product.id === id);
  if (!foundProduct) {
    return c.json(
      {
        error: {
          message: "Not found",
          url: `${BASE_URL}/products/:id`,
        },
      },
      404
    );
  }

  return c.json(foundProduct);
});

app.get(`${BASE_URL}/products`, (c) => {
  return c.json(products);
});

// Query Parameter
// app.get(`${BASE_URL}/search`, (c) => {
//   const isInStock: boolean = c.req.query("inStock");
//   return c.text(`Sort by inStock: ${isInStock}`);
// });

app.get(`${BASE_URL}/protected`, async (c) => {
  const { Authorization, api_key } = c.req.header();

  if (api_key === "123") {
    return c.json(products);
  }

  return c.text(`You are not authorized`);
});

app.post(`${BASE_URL}/auth/login`, async (c) => {
  const body = await c.req.parseBody();

  console.log("body >>>", body);

  return c.text(`You successfully logged in`);
});

/////

interface Games {
  id: string | number;
  title: string;
  genre: string;
  releaseYear: number;
}

const games: Games[] = [
  {
    id: "1",
    title: "The Legend of Zelda",
    genre: "Adventure",
    releaseYear: 1986,
  },
  {
    id: "2",
    title: "Super Mario Bros.",
    genre: "Platformer",
    releaseYear: 1985,
  },
  { id: "3", title: "Minecraft", genre: "Sandbox", releaseYear: 2011 },
  {
    id: "4",
    title: "Valorant",
    genre: "Shooter",
    releaseYear: 2020,
  },
  {
    id: "5",
    title: "Counter Strike",
    genre: "Shooter",
    releaseYear: 2000,
  },
  {
    id: "6",
    title: "FIFA 23",
    genre: "Sports",
    releaseYear: 2022,
  },
];

app.get(`${BASE_URL}/games`, (c) => {
  return c.text("API v3 is running");
});

app.get(`${BASE_URL}/games/list`, (c) => {
  return c.json(games);
});
