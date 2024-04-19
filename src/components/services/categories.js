import { fetchWithResponse } from "./fetcher";

export function getCategories() {
  return fetchWithResponse("categories", {
    headers: {
      Authorization: `Token ${
        JSON.parse(localStorage.getItem("gamer_token")).token
      }`,
    },
  });
}