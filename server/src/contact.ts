import { Hono } from "hono";
import { cors } from "hono/cors";
import { logger } from "hono/logger";


// Define the app for this route
const app = new Hono();

// ------------------------------------------------------------------
// CORS – allow the client to call the endpoint (adjust origin if needed)
// ------------------------------------------------------------------
app.options("*", cors({
  origin: "*",
  allowMethods: ["POST"],
  allowHeaders: ["Content-Type"],
}));

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
    const payloadBase = c.env.PAYLOAD_URL;
    if (!payloadBase) {
      return c.json({ error: "PAYLOAD_URL not configured" }, 500 as any);
    }

    const res = await fetch(`${payloadBase}/api/contact-messages`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(payload),
    });

    // Log upstream response status and a few headers for debugging
    console.log('🔄 Forwarded to CMS – status:', res.status);
    console.log('🔄 CMS response headers:', {
      "content-type": res.headers.get("content-type"),
      "content-length": res.headers.get("content-length"),
    });

    // Safely parse JSON – the CMS might return non‑JSON on error
    let data: any;
    try {
      data = await res.json();
    } catch (parseErr) {
      const text = await res.text();
      console.error('⚠️ Failed to parse CMS response as JSON:', parseErr);
      console.error('⚠️ Raw response body:', text);
      return c.json({ error: 'Invalid response from CMS' }, 502 as any);
    }

    if (!res.ok) {
      // Forward the CMS error payload (or a generic message) with the same status code
      return c.json(data, res.status as any);
    }
    return c.json(data, 200 as any);
  } catch (err: any) {
    console.error("Contact proxy error:", err);
    return c.json({ error: err?.message ?? "Unknown error" }, 500 as any);
  }
});

export default app;
