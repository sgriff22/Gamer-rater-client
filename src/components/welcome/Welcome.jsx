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
    <div className="bg-red-800 h-screen flex justify-center items-center -m-4">
      <img
        src="public/images/logo/gamer-rater-logo.png"
        alt="Gamer Rater logo"
        className="rounded-2xl w-2/5 -mt-20 animation"
      />
    </div>
  );
};
