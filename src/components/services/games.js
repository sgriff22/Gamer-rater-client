import { fetchWithResponse, fetchWithoutResponse } from "./fetcher";

export function getGames() {
  return fetchWithResponse("games", {
    headers: {
      Authorization: `Token ${
        JSON.parse(localStorage.getItem("gamer_token")).token
      }`,
    },
  });
}

export function getGamesById(id) {
  return fetchWithResponse(`games/${id}`, {
    headers: {
      Authorization: `Token ${
        JSON.parse(localStorage.getItem("gamer_token")).token
      }`,
    },
  });
}

export function updateGame(id, game) {
  return fetchWithoutResponse(`games/${id}`, {
    method: "PUT",
    headers: {
      Authorization: `Token ${
        JSON.parse(localStorage.getItem("gamer_token")).token
      }`,
      "Content-Type": "application/json",
    },
    body: JSON.stringify(game),
  });
}

export function createGame(game) {
  return fetchWithoutResponse("games", {
    method: "POST",
    headers: {
      Authorization: `Token ${
        JSON.parse(localStorage.getItem("gamer_token")).token
      }`,
      "Content-Type": "application/json",
    },
    body: JSON.stringify(game),
  });
}