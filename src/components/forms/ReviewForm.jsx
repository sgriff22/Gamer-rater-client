import { useMutation, useQueryClient } from "@tanstack/react-query";
import { useState } from "react";
import { useNavigate, useParams } from "react-router-dom";

export const ReviewForm = () => {
  const { gameId } = useParams();
  const [review, setReview] = useState("");
  const queryClient = useQueryClient();
  const navigate = useNavigate();

  const game = queryClient.getQueryData(["game", gameId]);

  const {
    mutate: saveReview,
    isPending,
    isError,
    error,
  } = useMutation({
    mutationFn: async () => {
      const url = `http://localhost:8000/reviews`;
      const response = await fetch(url, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Token ${
            JSON.parse(localStorage.getItem("gamer_token")).token
          }`,
        },
        body: JSON.stringify({ game_id: gameId, review: review }),
      });

      if (!response.ok) {
        throw new Error("Failed to save review");
      }

      return navigate(`/games/${gameId}`);
    },
  });

  if (isPending) return <div>Loading...</div>;
  if (isError) return <div>Error: {error.message}</div>;

  const handleSave = (e) => {
    e.preventDefault();
    saveReview();
  };

  return (
    <div className="flex justify-center items-center mt-8">
      <form className="w-full max-w-lg bg-gray-100  shadow-md rounded-lg px-8 pt-6 pb-8 mb-4">
        <h1 className="text-center text-red-800">Write a Review</h1>
        <h2 className="text-center">{game?.title}</h2>
        <fieldset className="mt-2 text-lg">
          <label htmlFor="review">Your Review:</label>
          <textarea
            id="review"
            value={review}
            className="form-control h-auto"
            onChange={(e) => {
              setReview(e.target.value);
            }}
          />
        </fieldset>
        <fieldset className="mt-5 flex justify-end">
          <button
            className="mr-3"
            type="button" 
            onClick={() => {
              navigate(`/games/${gameId}`);
            }}
          >
            Cancel
          </button>
          <button className="mr-5" onClick={handleSave}>
            Save
          </button>
        </fieldset>
      </form>
    </div>
  );
};
