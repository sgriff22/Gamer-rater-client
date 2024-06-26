import { useMutation, useQueryClient } from "@tanstack/react-query";
import { useParams } from "react-router-dom";
import PropTypes from "prop-types";

export const RatingSlider = ({ rating, setRating, setUserRating }) => {
  RatingSlider.propTypes = {
    rating: PropTypes.number.isRequired,
    setRating: PropTypes.func.isRequired,
    setUserRating: PropTypes.func.isRequired,
  };

  const { gameId } = useParams();
  const queryClient = useQueryClient();

  const {
    mutate: saveRating,
    isPending,
    isError,
    error,
  } = useMutation({
    mutationFn: async () => {
      const url = `http://localhost:8000/ratings`;
      const response = await fetch(url, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Token ${
            JSON.parse(localStorage.getItem("gamer_token")).token
          }`,
        },
        body: JSON.stringify({ game_id: gameId, rating: rating }),
      });

      if (!response.ok) {
        throw new Error("Failed to save review");
      }
      console.log(response);
      return response.json();
    },
    onSuccess: (data) => {
      setUserRating(data.rating);
      queryClient.invalidateQueries(["user"]);
      queryClient.invalidateQueries(["game"]);
    },
  });

  if (isPending) return <div>Loading...</div>;
  if (isError) return <div>Error: {error.message}</div>;

  const onSubmit = () => {
    saveRating();
  };

  return (
    <div className="ml-5">
      <div className=" shadow-md border rounded-lg flex flex-col pl-5 pr-3 py-3">
        <label htmlFor="rating" className="text-lg">
          Rate the game:
        </label>

        <div className="flex justify-start items-center">
          <input
            type="range"
            id="rating"
            name="rating"
            min="0"
            max="10"
            step="1"
            value={rating}
            className="bg-gray-300 appearance-none h-2 w-3/4 rounded-lg focus:border-none"
            onChange={(e) => setRating(parseInt(e.target.value))}
          />
          <span className="ml-2 text-lg">{rating}</span>
        </div>
        <div>
          <button className="text-xs hover:text-xs" onClick={onSubmit}>
            Submit
          </button>
        </div>
      </div>
    </div>
  );
};
