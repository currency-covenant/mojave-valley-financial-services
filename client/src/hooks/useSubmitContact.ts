import { useMutation, UseMutationResult } from '@tanstack/react-query';

/**
 * Sends the contact payload to our own Hono API, which is responsible
 * for forwarding it to the backend. The API expects a JSON body whose
 * keys match the field names of the form (`name`, `email`, `phone`,
 * `message`).
 *
 * The base URL comes from the environment variable `VITE_SERVER_URL`.
 * It is required — we deliberately have no hard-coded fallback host,
 * because silently posting contact submissions to the wrong domain is
 * far worse than failing loudly.
 */
async function submitContact(data: ContactPayload) {
  const serverBase = import.meta.env.VITE_SERVER_URL;

  if (!serverBase) {
    throw new Error(
      "Contact form is not configured: VITE_SERVER_URL is missing.",
    );
  }

  const endpoint = `${serverBase.replace(/\/+$/, '')}/payload/form`;

  const response = await fetch(endpoint, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(data),
  });

  if (!response.ok) {
    // Try to surface a helpful error from the API; otherwise use a generic one.
    let errMsg = `Failed to submit contact (status ${response.status})`;
    try {
      const err = await response.json();
      errMsg = err?.message ?? err?.error ?? errMsg;
    } catch {
      // response isn’t JSON – keep default message
    }
    throw new Error(errMsg);
  }

  // Return the parsed JSON body, or an empty object.
  try {
    return await response.json();
  } catch {
    return {};
  }
}


export type ContactPayload = {
  name: string;
  email: string;
  phone?: string;
  message: string;
};

/**
 * TanStack Query hook for submitting a contact form via the Hono API.
 */
export const useSubmitContact = (): UseMutationResult<
  unknown,
  Error,
  ContactPayload
> => {
  return useMutation({
    mutationFn: submitContact,
    // You can add onSuccess/onError here if you want to trigger side‑effects.
  });
};
