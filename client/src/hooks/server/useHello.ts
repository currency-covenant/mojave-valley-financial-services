import { useMutation, UseMutationResult } from "@tanstack/react-query";
import { hcWithType } from "server/dist/client";

// Define the shape of the successful response from the hello endpoint.
export type HelloResponse = {
  message: string;
  success: boolean;
};

/**
 * Custom hook that wraps the `client.hello.$get` request.
 * It returns the standard React‑Query mutation result so callers can
 * handle loading / error states and react to success.
 */
export const useHello = (): UseMutationResult<
  HelloResponse,
  unknown,
  void,
  unknown
> => {
  const SERVER_URL =
    import.meta.env.VITE_SERVER_URL || "http://localhost:3000";
  const client = hcWithType(SERVER_URL);

  return useMutation({
    mutationFn: async () => {
      const res = await client.hello.$get();
      if (!res.ok) {
        throw new Error("Error fetching data");
      }
      // The JSON payload matches HelloResponse
      return (await res.json()) as HelloResponse;
    },
  });
};
