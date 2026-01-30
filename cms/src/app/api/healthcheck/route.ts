import { NextResponse } from 'next/server';
import { getPayload } from 'payload';
import config from '../../../payload.config';

export async function GET() {
  const payload = await getPayload({ config });
  const result = await payload.find({ collection: 'users', limit: 1 });
  return NextResponse.json({ ok: true, count: result.totalDocs, first: result.docs[0] ?? null });
}
