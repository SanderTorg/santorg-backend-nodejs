import { Hono } from "hono";
import { z } from "zod";
import type { Product } from "./products.js";
import { zValidator } from "../../utils/validator-wrapper.js";
import { newProductSchema } from "./products.schema.js";

const products: Product[] = [
  { id: "1", name: "Laptop", price: 1200 },
  { id: "2", name: "Headphones", price: 150 },
  { id: "3", name: "Keyboard", price: 80 },
];

export const app = new Hono()
  .get("/", (c) => {
    return c.json(products);
  })
  .get("/:id", (c) => {
    const id = c.req.param("id");
    const foundProduct = products.find((product) => product.id === id);
    if (!foundProduct) {
      return c.json(
        {
          error: "Product not found",
        },
        404
      );
    }

    return c.json(foundProduct);
  })
  .post("/", zValidator("form", newProductSchema), (c) => {
    const { name, price } = c.req.valid("form");
    let newID = crypto.randomUUID();

    products.push({
      id: newID,
      name,
      price,
    });

    return c.json(
      {
        ok: true,
        data: {
          id: newID,
          name,
          price,
        },
      },
      201
    );
  });
