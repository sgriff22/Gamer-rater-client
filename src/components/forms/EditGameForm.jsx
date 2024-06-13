import { useMutation, useQueryClient } from "@tanstack/react-query";
import { useEffect, useState } from "react";
import { getCategories } from "../services/categories";
import { useNavigate, useParams } from "react-router-dom";
import { updateGame } from "../services/games";

export const EditGameForm = () => {
  const { gameId } = useParams();
  const [editGame, setEditGame] = useState({});
  const [allCategories, setAllCategories] = useState([]);
  const [selectedCategoryIds, setSelectedCategoryIds] = useState([]);
  const navigate = useNavigate();

  const queryClient = useQueryClient();

  const game = queryClient.getQueryData(["game", gameId]);

  useEffect(() => {
    if (game) {
      setEditGame(game);
    }
  }, [game]);

  useEffect(() => {
    getCategories().then((res) => {
      setAllCategories(res);
    });
  }, []);

  useEffect(() => {
    if (game.categories) {
      setSelectedCategoryIds(game.categories.map((cat) => cat.id));
    }
  }, [game]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setEditGame((prevGame) => ({
      ...prevGame,
      [name]: value,
    }));
  };

  const handleCategoryChange = (e) => {
    // Get all the selected options
    const selectedOptions = Array.from(e.target.options).filter(
      (option) => option.selected
    );

    // Extract the values (category IDs) from the selected options
    const newCategoryIds = selectedOptions.map((option) =>
      parseInt(option.value)
    );

    // Check if the new category ID is already in the array
    if (selectedCategoryIds.includes(newCategoryIds[0])) {
      // If it is, remove it from the array
      setSelectedCategoryIds((prevIds) =>
        prevIds.filter((id) => !newCategoryIds.includes(id))
      );
    } else {
      // If it's not, add it to the array
      setSelectedCategoryIds((prevIds) => [...prevIds, ...newCategoryIds]);
    }
  };

  useEffect(() => {
    setEditGame((prevGame) => ({
      ...prevGame,
      categories: selectedCategoryIds,
    }));
  }, [selectedCategoryIds]);

  const {
    mutate: saveGame,
    isPending,
    isError,
    error,
  } = useMutation({
    mutationFn: () =>
      updateGame(gameId, editGame).then(() => {
        navigate(`/games/${gameId}`);
      }),
  });

  if (isPending) return <div>Loading...</div>;
  if (isError) return <div>Error: {error.message}</div>;

  const handleSave = (e) => {
    e.preventDefault();
    saveGame();
  };

  return (
    <div className="flex justify-center items-center mt-8 mb-5">
      <form className="w-full max-w-lg bg-gray-100 shadow-md rounded-lg pb-12 pt-10 px-20 mb-4">
        <h1 className="text-center">Edit Game</h1>
        <fieldset className="mt-2 text-lg flex flex-col">
          <label htmlFor="title">Title:</label>
          <input
            id="title"
            type="text"
            name="title"
            value={editGame.title || game.title}
            className="rounded-md text-gray-400 px-2 py-1 border shadow-sm"
            onChange={handleChange}
          />
        </fieldset>
        <fieldset className="mt-2 text-lg flex flex-col">
          <label htmlFor="designer">Designer:</label>
          <input
            id="designer"
            type="text"
            name="designer"
            onChange={handleChange}
            value={editGame.designer || game.designer}
            className="rounded-md text-gray-400 px-2 py-1 border shadow-sm"
          />
        </fieldset>
        <div className="flex gap-5">
          <fieldset className="mt-2 text-lg flex flex-col w-1/2">
            <label htmlFor="year">Year:</label>
            <input
              id="year"
              type="number"
              name="year"
              onChange={handleChange}
              value={editGame.year || game.year}
              className="rounded-md text-gray-400 px-2 py-1 border shadow-sm w-full"
            />
          </fieldset>
          <fieldset className="mt-2 text-lg flex flex-col w-1/2">
            <label htmlFor="players">Number of players:</label>
            <input
              id="players"
              type="number"
              name="number_of_players"
              onChange={handleChange}
              value={editGame.number_of_players || game.number_of_players}
              className="rounded-md text-gray-400 px-2 py-1 border shadow-sm w-full"
            />
          </fieldset>
        </div>
        <fieldset className="mt-2 text-lg flex flex-col">
          <label htmlFor="PlayTime"> Estimated play time (hours):</label>
          <input
            id="PlayTime"
            type="number"
            name="play_time"
            onChange={handleChange}
            value={editGame.play_time || game.play_time}
            className="rounded-md text-gray-400 px-2 py-1 border shadow-sm"
          />
        </fieldset>
        <fieldset className="mt-2 text-lg flex flex-col">
          <label htmlFor="age">Recommended age:</label>
          <input
            id="age"
            type="text"
            name="age"
            onChange={handleChange}
            value={editGame.age || game.age}
            className="rounded-md text-gray-400 px-2 py-1 border shadow-sm"
          />
        </fieldset>
        <fieldset className="mt-2 text-lg">
          <label htmlFor="category">
            Categories:{" "}
            <div className="-mb-6 -mt-1 text-sm">(Select all that apply)</div>
          </label>
          <br />
          <select
            id="category"
            name="categories"
            multiple
            value={selectedCategoryIds}
            size="4"
            className="px-6 py-2 w-72 border border-gray-200 rounded-md"
            onChange={handleCategoryChange}
          >
            {allCategories.map((cat) => (
              <option
                key={`category-${cat.id}`}
                value={cat.id}
                className="mb-1 text-gray-400"
              >
                {cat.label}
              </option>
            ))}
          </select>
        </fieldset>

        <fieldset className="mt-2">
          <button onClick={handleSave}>Save</button>
        </fieldset>
      </form>
    </div>
  );
};
