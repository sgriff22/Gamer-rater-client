import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";

export const GameDetails = () => {
  const [game, setGame] = useState({});
  const { gameId } = useParams();

  const fetchSingleGameFromAPI = async (id) => {
    let url = `http://localhost:8000/games/${id}`;

    const response = await fetch(url, {
      headers: {
        Authorization: `Token ${
          JSON.parse(localStorage.getItem("gamer_token")).token
        }`,
      },
    });
    const game = await response.json();
    setGame(game);
  };

  useEffect(() => {
    fetchSingleGameFromAPI(gameId);
  }, [gameId]);

  return (
    <div>
      <h1>{game.title}</h1>
      <p>Designer: {game.designer}</p>
      <p>Year released: {game.year}</p>
      <p>Number of players: {game.number_of_players}</p>
      <p>Estimated time to play: {game.play_time} hours</p>
      <p>Recommended Age: {game.age}</p>
      <h3>
        Categories:{" "}
        {/* only map if there are categories, else display message that says no categories */}
        {game.categories && game.categories.length > 0 ? (
          game.categories.map((cat, index) => (
            <span key={cat.id}>
              {cat.label}
              {index !== game.categories.length - 1 && ", "}
            </span>
          ))
        ) : (
          <span>No categories listed</span>
        )}
      </h3>
    </div>
  );
};
