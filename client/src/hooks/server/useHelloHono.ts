import { useMutation, UseMutationOptions, UseMutationResult } from '@tanstack/react-query';
import { fetchHello, HelloResponse } from '@/hooks/server/helloHono';

/**
 * Custom hook that wraps the `fetchHello` mutation.
 * Allows callers to pass TanStack Query mutation options such as
 * `onSuccess`, `onError`, etc.
 */
export function useHelloHono(
  options?: UseMutationOptions<HelloResponse, Error, void, unknown>
): UseMutationResult<HelloResponse, Error, void, unknown> {
  return useMutation({
    mutationFn: fetchHello,
    ...options,
  });
}
