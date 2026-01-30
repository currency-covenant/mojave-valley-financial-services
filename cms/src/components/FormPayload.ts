/// <reference types="vite/client" />
export async function submitContact(data: {
  name: string;
  email: string;
  phone?: string;
  message: string;
}) {
  const base = (import.meta.env.VITE_SERVER_URL ??
               process.env.NEXT_PUBLIC_API_BASE ??
               'http://localhost:3001') as string;
  console.log('⚙️ API base resolved:', base);
  const response = await fetch(`${base}/payload/form`, {
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
