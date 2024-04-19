import { useQuery } from "@tanstack/react-query";
import { getUser } from "../services/user";

export const Welcome = () => {
  const userInfo = useQuery({
    queryKey: ["user"],
    queryFn: getUser,
  });

  if (userInfo.isLoading) return <div>Loading...</div>;
  if (userInfo.isError) return <div>Error: {userInfo.error.message}</div>;

  return (
    <div className="bg-red-800 h-screen flex items-center justify-center">
      <div className="text-center text-white">
        <h1 className="font-bold mb-4">Welcome, to Gamer Rater!</h1>
        <p className="text-lg mb-6">
          Get ready to add and rate your favorite video games!
        </p>
      </div>
    </div>
  );
};
