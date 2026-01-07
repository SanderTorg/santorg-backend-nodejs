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
  id: number;
  name: string;
  price: number;
  inStock: boolean;
}

const products: Product[] = [
  { id: 1, name: "Laptop", price: 999.99, inStock: true },
  { id: 2, name: "Smartphone", price: 499.99, inStock: false },
  { id: 3, name: "Tablet", price: 299.99, inStock: true },
];

// Path Parameter
app.get(`${BASE_URL}/products/:id`, (c) => {
  const id = Number(c.req.param("id"));
  const product = products.find((p) => p.id === id);

  if (product) {
    return c.json(product);
  } else {
    return c.text("Product not found G", 404);
  }
});

app.get(`${BASE_URL}/products`, async (c) => {
  return c.json(products);
});

// Query Parameter
app.get(`${BASE_URL}/search`, async (c) => {
  // const isInStock: boolean = c.req.query("inStock");
  // return c.text(`Sort by inStock: ${isInStock}`);
});
