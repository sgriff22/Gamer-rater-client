import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";

export const NewGameForm = () => {
  const [allCategories, setAllCategories] = useState([]);
  const [title, setTitle] = useState("");
  const [designer, setDesigner] = useState("");
  const [year, setYear] = useState("");
  const [players, setPlayers] = useState("");
  const [playTime, setPlayTime] = useState("");
  const [age, setAge] = useState("");
  const [selectedCategoryId, setSelectedCategoryId] = useState(0);

  const navigate = useNavigate();

  const fetchCategoriesFromAPI = async () => {
    let url = "http://localhost:8000/categories";

    const response = await fetch(url, {
      headers: {
        Authorization: `Token ${
          JSON.parse(localStorage.getItem("gamer_token")).token
        }`,
      },
    });
    const categories = await response.json();
    setAllCategories(categories);
  };

  useEffect(() => {
    fetchCategoriesFromAPI();
  }, []);

  const handleSave = async (e) => {
    e.preventDefault();

    // Check if any of the fields are empty
    if (
      !title ||
      !designer ||
      !year ||
      !players ||
      !playTime ||
      !age ||
      !selectedCategoryId
    ) {
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
      categories: [selectedCategoryId],
    };

    await fetch("http://localhost:8000/games", {
      method: "POST",
      headers: {
        Authorization: `Token ${
          JSON.parse(localStorage.getItem("gamer_token")).token
        }`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify(game),
    });

    // After the POST request, navigate to games view
    navigate("/games");
  };

  return (
    <div className="flex justify-center items-center mt-8">
      <form className="w-full max-w-lg bg-gray-100  shadow-md rounded-lg px-8 pt-6 pb-8 mb-4">
        <h1 className="text-center text-red-800">New Game</h1>
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
          <label htmlFor="category">Category</label>
          <br />
          <select
            id="category"
            className="form-control"
            onChange={(e) => {
              setSelectedCategoryId(parseInt(e.target.value));
            }}
          >
            <option value={0}>- Select a type -</option>
            {allCategories.map((cat) => (
              <option key={`category-${cat.id}`} value={cat.id}>
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
