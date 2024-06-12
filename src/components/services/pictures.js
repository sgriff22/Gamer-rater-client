import { fetchWithResponse, fetchWithoutResponse } from "./fetcher";

export function createGamePic(pic) {
  return fetchWithoutResponse("game_pictures", {
    method: "POST",
    headers: {
      Authorization: `Token ${
        JSON.parse(localStorage.getItem("gamer_token")).token
      }`,
      "Content-Type": "application/json",
    },
    body: JSON.stringify(pic),
  });
}

export function getGamePics(gameId) {
  return fetchWithResponse(`game_pictures?gameId=${gameId}`, {
    headers: {
      Authorization: `Token ${
        JSON.parse(localStorage.getItem("gamer_token")).token
      }`,
    },
  });
}
