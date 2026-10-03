import { Hono } from "hono";
import { logger } from "hono/logger";

// Define the app for this route.
// CORS is applied globally in index.ts — declaring it here too would
// be overridden by that middleware.
const app = new Hono();

// Logger – helpful during development
app.use("*", logger());

// ------------------------------------------------------------------
// Contact submissions – currently a stub.
//
// There is no backing CMS to forward to yet, so this endpoint
// deliberately reports that submissions are unavailable rather than
// pretending to accept them. We still log the attempt so nothing is
// silently dropped while this is being built out.
//
// To restore real behaviour later, forward `payload` to the upstream
// API here and return its response instead of the 503 below.
// ------------------------------------------------------------------
app.post("/payload/form", async (c: any) => {
  try {
    const payload = await c.req.json();

    console.warn(
      "⚠️  Contact submission received but no backend is configured – discarding.",
      JSON.stringify(payload),
    );

    return c.json(
      {
        error:
          "Contact submissions are temporarily unavailable. Please reach out by phone or email instead.",
      },
      503 as any,
    );
  } catch (err: any) {
    console.error("Contact stub error:", err);
    return c.json({ error: "Invalid request body" }, 400 as any);
  }
});

export default app;