import { useEffect, useState } from "react";
import { Link } from "react-router-dom";

export const AllGames = () => {
  const [games, setGames] = useState([]);

  const fetchGamesFromAPI = async () => {
    let url = "http://localhost:8000/games";

    const response = await fetch(url, {
      headers: {
        Authorization: `Token ${
          JSON.parse(localStorage.getItem("gamer_token")).token
        }`,
      },
    });
    const games = await response.json();
    setGames(games);
  };

  useEffect(() => {
    fetchGamesFromAPI();
  }, []);

  return (
    <div>
      <h1>All Games</h1>
      {games.map((g) => {
        return (
          <Link key={g.id} to={`/games/${g.id}`}>
            <h3>{g.title}</h3>
          </Link>
        );
      })}
    </div>
  );
};
