import { useQuery, useQueryClient } from "@tanstack/react-query";
import { useNavigate, useParams } from "react-router-dom";
import { ReviewList } from "../reviews/ReviewList";
import { getGamesById } from "../services/games";
import { useEffect, useState } from "react";
import { RatingSlider } from "../ratings/RatingSlider";
import { getUser } from "../services/user";
import { PictureForm } from "../forms/PictureForm";
import { getGamePics } from "../services/pictures";

export const GameDetails = () => {
  const { gameId } = useParams();
  const navigate = useNavigate();
  const [rating, setRating] = useState(0);
  const [userRating, setUserRating] = useState(null);
  const [picToggle, setPicToggle] = useState(false);
  const [pics, setPics] = useState([]);

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

  useEffect(() => {
    getGamePics(gameId).then((res) => {
      setPics(res);
    });
  }, [gameId]);

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
    <div className="max-w-5xl mx-auto py-8">
      <div className="bg-gray-100 rounded-lg px-20 pt-12 pb-20 shadow-md">
        <div className="flex justify-between items-center">
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
          <div className="flex items-center pb-3">
            <span className="bg-red-800 text-white px-2 text-lg rounded-full">
              Rating: {game.average_rating}
            </span>
          </div>
        </div>
        <div className="flex justify-center mb-2 mt-1">
          <h1 className="text-center mb-8 text-6xl w-11/12">{game.title}</h1>
        </div>
        <div className="flex justify-between w-full">
          <div className="flex flex-col justify-evenly w-3/4">
            <p className="mb-2 text-lg">
              <span className="text-2xl">Designer: </span>
              <span className="text-red-800 bg-gray-200 px-2 py-1 rounded-lg">
                {game.designer}
              </span>
            </p>
            <p className="mb-2 text-lg">
              <span className="text-2xl">Year Released: </span>
              <span className="text-red-800 bg-gray-200 px-2 py-1 rounded-lg">
                {game.year}
              </span>
            </p>
            <p className="mb-2 text-lg">
              <span className="text-2xl">Number of Players: </span>
              <span className="text-red-800 bg-gray-200 px-2 py-1 rounded-lg">
                {game.number_of_players}
              </span>
            </p>
            <p className="mb-2 text-lg">
              <span className="text-2xl">Estimated Play Time: </span>
              <span className="text-red-800 bg-gray-200 px-2 py-1 rounded-lg">
                {game.play_time} hours
              </span>
            </p>
            <p className="mb-2 text-lg">
              <span className="text-2xl">Recommended Age: </span>
              <span className="text-red-800 bg-gray-200 px-2 py-1 rounded-lg">
                {game.age}
              </span>
            </p>
            <div className="flex items-center mb-2">
              <h3 className="text-2xl mr-2">Categories:</h3>
              {game.categories && game.categories.length > 0 ? (
                <ul className="text-gray-600">
                  {game.categories.map((cat) => (
                    <li
                      key={cat.id}
                      className="inline-block bg-gray-200 rounded-lg px-2 text-lg text-red-800 mr-2"
                    >
                      {cat.label}
                    </li>
                  ))}
                </ul>
              ) : (
                <p className="text-gray-400 text-lg">No categories listed</p>
              )}
            </div>
          </div>

          <div className="ml-4">
            {userRating === null ? (
              <RatingSlider
                rating={rating}
                setRating={setRating}
                setUserRating={setUserRating}
              />
            ) : (
              <div className="text-2xl ml-5">
                Your rating:{" "}
                <span className="text-red-800 bg-gray-200 p-1 rounded-lg">
                  {userRating}
                </span>
              </div>
            )}
          </div>
        </div>

        <ReviewList gameId={gameId} />
        <div className="flex items-center mt-4">
          <h2 className="text-red-800 mr-4">Action Shots</h2>
          <button
            onClick={() => {
              setPicToggle(!picToggle);
            }}
          >
            Upload Action Picture
          </button>
        </div>
        {picToggle && (
          <PictureForm
            gameId={gameId}
            setPicToggle={setPicToggle}
            setPics={setPics}
          />
        )}
        <div className="flex flex-wrap justify-start">
          {pics.map((p) => (
            <div className="p-2 w-1/2" key={p.id}>
              <img
                key={p.id}
                src={p.action_pic}
                alt={`Action pic of the ${game.title}`}
                className="rounded-md"
              />
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};
