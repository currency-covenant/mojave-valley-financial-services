import { Hono } from "hono";
import { cors } from "hono/cors";
import { logger } from "hono/logger";


// Define the app for this route
const app = new Hono();

// ------------------------------------------------------------------
// CORS – allow the client to call the endpoint (adjust origin if needed)
// ------------------------------------------------------------------
app.use(
  "*",
  cors({
    origin: "*", // you can restrict this to your client origin, e.g. 'http://localhost:5174'
    allowMethods: ["POST"],
    allowHeaders: ["Content-Type"],
  }),
);

// ------------------------------------------------------------------
// Logger – helpful during development
// ------------------------------------------------------------------
app.use("*", logger());



// ------------------------------------------------------------------
// Proxy handler – forwards the payload to the real Payload CMS endpoint
// ------------------------------------------------------------------
app.post("/payload/form", async (c: any) => {
  try {
    const payload = await c.req.json();
    const payloadBase = process.env.PAYLOAD_URL;
    if (!payloadBase) {
      return c.json({ error: "PAYLOAD_URL not configured" }, 500 as any);
    }

    const res = await fetch(`${payloadBase}/api/contact-messages`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(payload),
    });

    const data = await res.json();
    if (!res.ok) {
      return c.json(data, res.status as any);
    }
    return c.json(data, 200 as any);
  } catch (err: any) {
    console.error("Contact proxy error:", err);
    return c.json({ error: err?.message ?? "Unknown error" }, 500 as any);
  }
});

export default app;
