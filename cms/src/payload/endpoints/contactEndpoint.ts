import type { Endpoint } from 'payload';
import { APIError } from 'payload';

export const contactEndpoint: Endpoint = {
  path: '/api/contact',
  method: 'post',
  handler: async (req) => {
    const { name, email, phone, message } = await req.json() as any;
    if (!name || !email || !message) {
      throw new APIError('Missing required fields', 400);
    }
    await req.payload.create({
      collection: 'contactMessages',
      data: { name, email, phone, message },
      req,
      overrideAccess: false,
    });
    return new Response(JSON.stringify({ success: true }), { status: 201 });
  },
};
