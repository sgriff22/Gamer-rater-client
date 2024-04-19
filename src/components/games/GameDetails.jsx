import { useQuery, useQueryClient } from "@tanstack/react-query";
import { useNavigate, useParams } from "react-router-dom";
import { ReviewList } from "../reviews/ReviewList";
import { getGamesById } from "../services/games";
import { useEffect, useState } from "react";
import { RatingSlider } from "../ratings/RatingSlider";
import { getUser } from "../services/user";

export const GameDetails = () => {
  const { gameId } = useParams();
  const navigate = useNavigate();
  const [rating, setRating] = useState(0);
  const [userRating, setUserRating] = useState(null);

  const queryClient = useQueryClient();

  const user = queryClient.getQueryData(["user"]);

  useEffect(() => {
    // Check if the user has already rated the game
    const userRatingForGame = user.ratings.find(
      (rating) => rating.game_id == gameId
    );
    if (userRatingForGame) {
      // User has already rated the game, set the user rating
      setUserRating(userRatingForGame.rating);
    }
  }, [user, gameId]);

  const userInfo = useQuery({
    queryKey: ["user"],
    queryFn: getUser,
  });

  const {
    isPending,
    isError,
    data: game,
    error,
  } = useQuery({
    queryKey: ["game", gameId],
    queryFn: () => getGamesById(gameId),
  });

  if (userInfo.isLoading) return <div>Loading...</div>;
  if (userInfo.is) return <div>Error: {error.message}</div>;
  if (isPending) return <div>Loading...</div>;
  if (isError) return <div>Error: {error.message}</div>;

  return (
    <div className="max-w-5xl mx-auto px-4 py-8">
      <div className="bg-gray-100 rounded-lg p-10 shadow-md">
        <div className="flex justify-between items-center p-3">
          <div>
            {game.user_id === user.id && (
              <button
                onClick={() => {
                  navigate("edit");
                }}
              >
                Edit Game
              </button>
            )}
          </div>
          <div className="flex items-center">
            <span className="bg-red-800 text-white px-2 text-lg rounded-full">
              Rating: {game.average_rating}
            </span>
          </div>
        </div>
        <h1 className="text-center mb-8 text-red-800">{game.title}</h1>
        <div className="container mx-auto flex justify-center">
          <div className="grid grid-cols-1 md:grid-cols-2">
            <div className="flex flex-col justify-center">
              <p className="mb-2 text-lg">
                <span className="text-2xl">Designer: </span>
                {game.designer}
              </p>
              <p className="mb-2 text-lg">
                <span className="text-2xl">Year Released: </span>
                {game.year}
              </p>
              <p className="mb-2 text-lg">
                <span className="text-2xl">Number of Players: </span>
                {game.number_of_players}
              </p>
              <p className="mb-2 text-lg">
                <span className="text-2xl">Estimated Play Time: </span>
                {game.play_time} hours
              </p>
              <p className="mb-2 text-lg">
                <span className="text-2xl">Recommended Age: </span>
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
                      className="inline-block bg-gray-200 rounded-full px-3 py-1 text-sm font-semibold text-red-800 mr-2 mb-2"
                    >
                      {cat.label}
                    </li>
                  ))}
                </ul>
              ) : (
                <p className="text-gray-600 ml-20">No categories listed</p>
              )}
            </div>
            <div>
              {game.user_id !== user.id && (
                <button
                  className="mt-5"
                  onClick={() => {
                    navigate("review");
                  }}
                >
                  Review Game
                </button>
              )}
            </div>
            {game.user_id !== user.id && (
              <>
                {userRating === null ? (
                  <RatingSlider rating={rating} setRating={setRating} setUserRating={setUserRating} />
                ) : (
                  <div className="flex justify-end items-center">
                    Your rating: {userRating}
                  </div>
                )}
              </>
            )}
          </div>
        </div>
        <ReviewList gameId={gameId} />
      </div>
    </div>
  );
};
