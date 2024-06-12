import { useQuery } from "@tanstack/react-query";
import { Link, useNavigate } from "react-router-dom";
import { getGames } from "../services/games";

export const AllGames = () => {
  const navigate = useNavigate();

  const { isPending, isError, data, error } = useQuery({
    queryKey: ["games"],
    queryFn: getGames,
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
