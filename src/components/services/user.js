import { fetchWithResponse } from "./fetcher";

export function getUser() {
    return fetchWithResponse("user-details", {
      headers: {
        Authorization: `Token ${
          JSON.parse(localStorage.getItem("gamer_token")).token
        }`,
      },
    });
  }
