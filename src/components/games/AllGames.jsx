import { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";

export const AllGames = () => {
  const [games, setGames] = useState([]);
  const navigate = useNavigate();

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
    <div className="max-w-5xl mx-auto px-4">
      <h1 className="text-center">All Games</h1>
      <button
        onClick={() => {
          navigate("/newGame");
        }}
      >
        Register New Game
      </button>
      {games.map((g) => {
        return (
          <Link key={g.id} to={`/games/${g.id}`}>
            <div className="border border-red-800 rounded p-5 mt-4 hover:bg-gray-300">
              <h3>{g.title}</h3>
            </div>
          </Link>
        );
      })}
    </div>
  );
};
