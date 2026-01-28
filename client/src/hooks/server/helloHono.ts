import { hcWithType } from "server/dist/client";

export type HelloResponse = {
  message: string;
  success: boolean;
};

const SERVER_URL = import.meta.env.VITE_SERVER_URL || "http://localhost:3000";
const client = hcWithType(SERVER_URL);

/**
 * Performs the GET request to the `/hello` endpoint.
 * Throws an error if the response is not ok.
 * Returns the parsed JSON as `HelloResponse`.
 */
export async function fetchHello(): Promise<HelloResponse> {
  const res = await client.hello.$get();
  if (!res.ok) {
    throw new Error("Error fetching data");
  }
  return (await res.json()) as HelloResponse;
}
