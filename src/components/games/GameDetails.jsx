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
    <div className="max-w-5xl mx-auto px-4 py-8">
      <div className="bg-gray-100 rounded-lg p-10 shadow-md">
        <h1 className="text-center mb-8 text-red-800">{game.title}</h1>
        <div className="container mx-auto flex justify-center">
          <div className="grid grid-cols-1 md:grid-cols-2">
            <div className="flex flex-col justify-center">
              <p className="mb-2">
                <span className="font-semibold">Designer:</span> {game.designer}
              </p>
              <p className="mb-2">
                <span className="font-semibold">Year Released:</span>{" "}
                {game.year}
              </p>
              <p className="mb-2">
                <span className="font-semibold">Number of Players:</span>{" "}
                {game.number_of_players}
              </p>
              <p className="mb-2">
                <span className="font-semibold">Estimated Play Time:</span>{" "}
                {game.play_time} hours
              </p>
              <p className="mb-2">
                <span className="font-semibold">Recommended Age:</span>{" "}
                {game.age}
              </p>
            </div>
            <div className="flex flex-col justify-start ml-12">
              <h3 className="text-2xl font-semibold text-gray-800 ml-20">
                Categories:
              </h3>
              {game.categories && game.categories.length > 0 ? (
                <ul className="text-gray-600 ml-20">
                  {game.categories.map((cat) => (
                    <li
                      key={cat.id}
                      className="inline-block bg-gray-200 rounded-full px-3 py-1 text-sm font-semibold text-gray-700 mr-2 mb-2"
                    >
                      {cat.label}
                    </li>
                  ))}
                </ul>
              ) : (
                <p className="text-gray-600 ml-20">No categories listed</p>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
