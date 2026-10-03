import { Hono } from "hono";
import { cors } from "hono/cors";
import type { ApiResponse } from "shared";
import contactRoutes from "./contact";

/**
 * Origins allowed to call this API from a browser.
 *
 * The marketing site is the only production origin. The localhost
 * entries exist so the contact form works during local development,
 * where the client runs on Vite's dev port and the API on Bun's
 * default port.
 */
const ALLOWED_ORIGINS = [
  "https://mojavevalleyfinancial.com",
  "http://localhost:3000",
  "http://localhost:5173",
];

export const app = new Hono()

  // CORS is configured once, here, and applies to every route. Declaring
  // it in a route module as well would be overridden by this middleware.
  .use(
    "*",
    cors({
      origin: (origin) =>
        origin && ALLOWED_ORIGINS.includes(origin) ? origin : null,
      allowMethods: ["GET", "POST", "OPTIONS"],
      allowHeaders: ["Content-Type"],
    }),
  )
  .route("/", contactRoutes)

  .get("/", (c) => {
    return c.text("Hello Hono!");
  })

  .get("/hello", async (c) => {
    const data: ApiResponse = {
      message: "Hello BHVR!",
      success: true,
    };

    return c.json(data, { status: 200 });
  });

export default app;