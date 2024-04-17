import { useQuery } from "@tanstack/react-query";
import { Link, useNavigate } from "react-router-dom";

export const AllGames = () => {
  const navigate = useNavigate();

  const { isPending, isError, data, error } = useQuery({
    queryKey: ["games"],
    queryFn: async () => {
      const url = "http://localhost:8000/games";

      const response = await fetch(url, {
        headers: {
          Authorization: `Token ${
            JSON.parse(localStorage.getItem("gamer_token")).token
          }`,
        },
      });

      if (!response.ok) {
        throw new Error("Failed to fetch games");
      }

      return response.json();
    }, 
  });

  if (isPending) return <div>Loading...</div>;
  if (isError) return <div>Error: {error.message}</div>;

  return (
    <div className="max-w-5xl mx-auto px-4">
      <h1 className="text-center">All Games</h1>
      <button
        onClick={() => {
          navigate("/newGame");
        }}
      >
        Register New Game
      </button>
      {data.map((g) => {
        return (
          <Link key={g.id} to={`/games/${g.id}`}>
            <div className="border border-red-800 rounded p-5 mt-4 hover:bg-gray-300">
              <h3>{g.title}</h3>
            </div>
          </Link>
        );
      })}
    </div>
  );
};
