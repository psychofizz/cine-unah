import { createClient } from "tinacms/dist/client";
import { queries } from "./types";
export const client = createClient({ url: 'http://localhost:4001/graphql', token: 'b1ea52e5-e152-4f8b-a124-bbc329a88c6b', queries,  });
export default client;
  