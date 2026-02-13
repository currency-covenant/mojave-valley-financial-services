import { useMutation, UseMutationResult } from '@tanstack/react-query';

/**
 * Sends the contact payload straight to the multi‑tenant CMS using the native
 * `fetch` API. The CMS expects a JSON body whose keys match the field names
 * defined in its Form (`name`, `email`, `phone`, `message`).
 *
 * The base URL is taken from the environment variable `VITE_CMS_URL`. If the
 * variable is missing we fall back to the public domain you provided.
 */
async function submitContact(data: ContactPayload) {
  const cmsBase = (import.meta.env.VITE_CMS_URL ??
    'https://cms.currencycovenant.com') as string;

  // Public collection that stores contact submissions (no Form Builder involved)
  const endpoint = `${cmsBase.replace(/\/+$/, '')}/api/contact-submissions`;

  const response = await fetch(endpoint, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(data),
  });

  if (!response.ok) {
    // Try to surface a helpful error from the CMS; otherwise use a generic one.
    let errMsg = `Failed to submit contact (status ${response.status})`;
    try {
      const err = await response.json();
      errMsg = err?.message ?? errMsg;
    } catch {
      // response isn’t JSON – keep default message
    }
    throw new Error(errMsg);
  }

  // Return the parsed JSON (the created form‑submission record) or an empty object.
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
 * TanStack Query hook for submitting a contact form via the Hono proxy.
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
