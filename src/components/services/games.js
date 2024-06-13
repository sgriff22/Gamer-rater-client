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

export function getFilteredGames(searchQuery, orderByQuery) {
  let queryString = "";

  // Construct the query string based on provided parameters
  if (searchQuery && orderByQuery) {
    queryString = `?q=${searchQuery}&orderby=${orderByQuery}`;
  } else if (searchQuery) {
    queryString = `?q=${searchQuery}`;
  } else if (orderByQuery) {
    queryString = `?orderby=${orderByQuery}`;
  }

  return fetchWithResponse(`games${queryString}`, {
    headers: {
      Authorization: `Token ${
        JSON.parse(localStorage.getItem("gamer_token")).token
      }`,
    },
  });
}
