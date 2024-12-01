import { queryResponseType } from "@shared/ts/type";

export default async function postQuery(
  query: string,
): Promise<queryResponseType> {
  const response = await fetch(import.meta.env.VITE_CHATBOT_API_URL, {
    method: "POST",
    headers: {
      "content-type": "application/json",
      authorization: import.meta.env.VITE_CHATBOT_API_KEY,
    },
    body: JSON.stringify({
      userQuery: query,
    }),
  });

  return await response.json();
}
