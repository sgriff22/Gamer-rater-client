import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { getCategories } from "../services/categories";
import { createGame } from "../services/games";

export const NewGameForm = () => {
  const [allCategories, setAllCategories] = useState([]);
  const [title, setTitle] = useState("");
  const [designer, setDesigner] = useState("");
  const [year, setYear] = useState("");
  const [players, setPlayers] = useState("");
  const [playTime, setPlayTime] = useState("");
  const [age, setAge] = useState("");
  const [selectedCategoryIds, setSelectedCategoryIds] = useState([]);

  const navigate = useNavigate();

  useEffect(() => {
    getCategories().then((res) => {
      setAllCategories(res);
    });
  }, []);

  const handleSave = async (e) => {
    e.preventDefault();

    // Check if any of the fields are empty
    if (!title || !designer || !year || !players || !playTime || !age) {
      window.alert("Please fill out all fields.");
      return;
    }

    const game = {
      title: title,
      designer: designer,
      year: parseInt(year),
      number_of_players: parseInt(players),
      play_time: parseInt(playTime),
      age: age,
      categories: selectedCategoryIds,
    };

    createGame(game).then(() => {
      // After the POST request, navigate to games view
      navigate("/games");
    });
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

  return (
    <div className="flex justify-center items-center mt-8">
      <form className="w-full max-w-lg bg-gray-100  shadow-md rounded-lg px-8 pt-6 pb-8 mb-4">
        <h1 className="text-center">New Game</h1>
        <fieldset className="mt-2 text-lg">
          <label htmlFor="title">Title:</label>
          <input
            id="title"
            type="text"
            value={title}
            className="form-control"
            onChange={(e) => {
              setTitle(e.target.value);
            }}
          />
        </fieldset>
        <fieldset className="mt-2 text-lg">
          <label htmlFor="designer">Designer:</label>
          <input
            id="designer"
            type="text"
            onChange={(e) => {
              setDesigner(e.target.value);
            }}
            value={designer}
            className="form-control"
          />
        </fieldset>
        <fieldset className="mt-2 text-lg">
          <label htmlFor="year">Year:</label>
          <input
            id="year"
            type="number"
            onChange={(e) => {
              setYear(e.target.value);
            }}
            value={year}
            className="form-control"
          />
        </fieldset>
        <fieldset className="mt-2 text-lg">
          <label htmlFor="players">Number of players:</label>
          <input
            id="players"
            type="number"
            onChange={(e) => {
              setPlayers(e.target.value);
            }}
            value={players}
            className="form-control"
          />
        </fieldset>
        <fieldset className="mt-2 text-lg">
          <label htmlFor="PlayTime"> Estimated play time (hours):</label>
          <input
            id="PlayTime"
            type="number"
            onChange={(e) => {
              setPlayTime(e.target.value);
            }}
            value={playTime}
            className="form-control"
          />
        </fieldset>
        <fieldset className="mt-2 text-lg">
          <label htmlFor="age">Recommended age:</label>
          <input
            id="age"
            type="text"
            onChange={(e) => {
              setAge(e.target.value);
            }}
            value={age}
            className="form-control"
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
                className="mb-1"
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
