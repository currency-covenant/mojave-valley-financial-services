import { useMutation, UseMutationResult } from '@tanstack/react-query';
import { submitContact } from '@cms/components/FormPayload'; // adjust if alias differs

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
