import { useQuery } from "@tanstack/react-query";
import { Link, useNavigate } from "react-router-dom";
import { getFilteredGames, getGames } from "../services/games";
import { useEffect, useState } from "react";

export const AllGames = () => {
  const [searchTerm, setSearchTerm] = useState("");
  const [orderBy, setOrderBy] = useState("");
  const [filteredGames, setFilteredGames] = useState([]);
  const navigate = useNavigate();

  const handleKeyDown = async (event) => {
    if (event.key === "Enter") {
      getFilteredGames(searchTerm, orderBy).then((res) => {
        setFilteredGames(res);
      });
    }
  };

  // Use useEffect to trigger getFilteredGames when orderBy changes
  useEffect(() => {
    getFilteredGames(searchTerm, orderBy).then((res) => {
      setFilteredGames(res);
    });
  }, [orderBy]);

  const { isPending, isError, data, error } = useQuery({
    queryKey: ["games"],
    queryFn: getGames,
  });

  if (isPending) return <div>Loading...</div>;
  if (isError) return <div>Error: {error.message}</div>;

  const gamesToRender = filteredGames.length > 0 ? filteredGames : data;

  return (
    <div className="max-w-5xl mx-auto px-4">
      <h1 className="text-center">All Games</h1>
      <div className="flex mt-5">
        <input
          name="search"
          type="text"
          value={searchTerm}
          placeholder="Search by game title..."
          className="text-xs px-2 border rounded-md shadow-sm mr-5"
          onChange={(event) => {
            setSearchTerm(event.target.value);
          }}
          onKeyDown={handleKeyDown}
        />
        <select
          id="orderby"
          onChange={(event) => {
            setOrderBy(event.target.value);
          }}
          className="text-xs text-gray-400 px-2 border rounded-md shadow-sm mr-5"
        >
          <option value="">Sort by...</option>
          <option value="oldest">Year: Oldest to Newest</option>
          <option value="newest">Year: Newest to Oldest</option>
          <option value="play_time">Estimated play time</option>
          <option value="designer">Designer</option>
        </select>
        <button
          onClick={() => {
            navigate("/newGame");
          }}
        >
          Register New Game
        </button>
      </div>
      {gamesToRender.map((g) => {
        return (
          <Link key={g.id} to={`/games/${g.id}`}>
            <div className="border-2 border-red-800 rounded-lg p-5 mt-4 hover:gameLink">
              <h3 className="flex items-center justify-between">
                {g.title}{" "}
                <span className="bg-red-800 text-white px-2 text-lg rounded-full">
                  Rating: {g.average_rating}
                </span>
              </h3>
            </div>
          </Link>
        );
      })}
    </div>
  );
};
