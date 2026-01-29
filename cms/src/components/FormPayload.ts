/// <reference types="vite/client" />
export async function submitContact(data: {
  name: string;
  email: string;
  phone?: string;
  message: string;
}) {
  const base = 'http://localhost:3001';
  const response = await fetch(`${base}/api/contact`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },

    body: JSON.stringify(data),
  });

  if (!response.ok) {
    const err = await response.json() as any;
    throw new Error(err?.message ?? 'Failed to submit contact form');
  }

  return response.json();
}
