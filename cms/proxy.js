export async function onRequest(context) {
  const { request } = context;
  const targetBase = PAYLOAD_SERVICE_URL; // injected via wrangler vars
  const url = new URL(request.url);
  const target = `${targetBase}${url.pathname}${url.search}`;

  const resp = await fetch(target, {
    method: request.method,
    headers: request.headers,
    body: request.body,
    redirect: "manual",
  });

  return new Response(resp.body, {
    status: resp.status,
    headers: resp.headers,
  });
}
