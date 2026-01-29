import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';

// Origins that are allowed to call the API. Add more URLs here if you ever need them.
const ALLOWED_ORIGINS = ['http://localhost:5173'];

export function middleware(request: NextRequest) {
  const response = NextResponse.next();

  const origin = request.headers.get('origin');
  if (origin && ALLOWED_ORIGINS.includes(origin)) {
    response.headers.set('Access-Control-Allow-Origin', origin);
    // Important for caching proxies – vary on Origin so browsers don’t cache the wrong header.
    response.headers.append('Vary', 'Origin');
    response.headers.set('Access-Control-Allow-Methods', 'GET,POST,OPTIONS');
    response.headers.set(
      'Access-Control-Allow-Headers',
      'Content-Type, Authorization, X-Requested-With',
    );
    // Change to true if you ever need to send cookies / auth headers.
    response.headers.set('Access-Control-Allow-Credentials', 'false');
  }

  // Pre‑flight request – answer immediately with a 204 and the CORS headers.
  if (request.method === 'OPTIONS') {
    return new NextResponse(null, {
      status: 204,
      headers: response.headers,
    });
  }

  return response;
}

export const config = {
  // Apply only to API routes. Adjust the matcher if you need a broader scope.
  matcher: ['/api/:path*'],
};
