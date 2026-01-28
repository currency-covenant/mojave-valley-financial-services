import { getPayload } from 'payload';
import config from '../../../../payload.config';

export async function POST(request: Request) {
  const { name, email, phone, message } = (await request.json()) as {
    name?: string;
    email?: string;
    phone?: string;
    message?: string;
  };
  if (!name || !email || !message) {
    return new Response(JSON.stringify({ error: 'Missing required fields' }), { status: 400 });
  }

  const payload = await getPayload({ config });

  await payload.create({
    collection: 'contactMessages',
    data: { name, email, phone, message },
    // Explicitly enforce access control
    overrideAccess: false,
  });

  return new Response(JSON.stringify({ success: true }), { status: 201 });
}