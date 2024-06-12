import { useQuery } from "@tanstack/react-query";
import PropTypes from "prop-types";
import { useNavigate } from "react-router-dom";

export const ReviewList = ({ gameId, gameUserId, userId }) => {
  const navigate = useNavigate();

  const {
    isPending,
    isError,
    data: reviews,
    error,
  } = useQuery({
    queryKey: ["reviews", gameId],
    queryFn: async () => {
      const url = `http://localhost:8000/reviews?gameId=${gameId}`;

      const response = await fetch(url, {
        headers: {
          Authorization: `Token ${
            JSON.parse(localStorage.getItem("gamer_token")).token
          }`,
        },
      });

      if (!response.ok) {
        throw new Error("Failed to fetch reviews");
      }

      return response.json();
    },
  });

  if (isPending) return <div>Loading...</div>;
  if (isError) return <div>Error: {error.message}</div>;

  ReviewList.propTypes = {
    gameId: PropTypes.string.isRequired,
    gameUserId: PropTypes.number,
    userId: PropTypes.number,
  };

  return (
    <div className="max-w-4xl mt-3">
      <div className="flex items-center">
        <h2 className=" text-red-800 mb-1 mr-4">Reviews</h2>

        {gameUserId !== userId && (
          <button
            onClick={() => {
              navigate("review");
            }}
          >
            Review Game
          </button>
        )}
      </div>
      <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
        {reviews.map((r) => {
          return (
            <div
              key={r.id}
              className="rounded-lg p-4 mb-4 border border-red-800 bg-gray-200"
            >
              <p className="text-sm">{r.review}</p>
              <p className="text-gray-600 text-sm">
                - {r.user.first_name} {r.user.last_name}
              </p>
            </div>
          );
        })}
      </div>
    </div>
  );
};
