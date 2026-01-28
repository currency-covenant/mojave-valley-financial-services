export async function submitContact(data: {
  name: string;
  email: string;
  phone?: string;
  message: string;
}) {
  const response = await fetch('/api/contact', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    credentials: 'include',
    body: JSON.stringify(data),
  });

  if (!response.ok) {
    const err = await response.json() as any;
    throw new Error(err?.message ?? 'Failed to submit contact form');
  }

  return response.json();
}
