import { useQuery } from "@tanstack/react-query";
import PropTypes from "prop-types";

export const ReviewList = ({ gameId }) => {
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
  };

  return (
    <div className="max-w-xl mx-auto">
      <h2 className="text-center text-red-800 underline mb-4">Reviews</h2>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
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
