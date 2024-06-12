import { useQueryClient } from "@tanstack/react-query";
import { NavLink, useNavigate } from "react-router-dom";

export const NavBar = () => {
  const navigate = useNavigate();
  const queryClient = useQueryClient();
  const user = queryClient.getQueryData(["user"]);

  const handleLogout = () => {
    // Clear user token from local storage
    localStorage.removeItem("gamer_token");

    // Clear user data from the cache
    queryClient.setQueryData(["user"], () => {
      return (user.data = null);
    });

    // Navigate to the login page
    navigate("/login");
  };

  return (
    <ul className="navbar p-3 bg-gray-300 flex items-center">
      <li className="navbar__item">
        <NavLink to={"/"}>
          <img
            src="public/images/logo/gamer-rater-logo-gray.png"
            alt="Gamer Rater Logo"
            className="w-16 ml-5 hover:scale-110 transition-transform duration-500"
          />
        </NavLink>
      </li>
      <li className="navbar__item pl-7">
        <NavLink
          className="text-left text-red-800 transition-all duration-500 hover:yellow"
          to={"/games"}
        >
          Games
        </NavLink>
      </li>

      <li className="navbar__item ml-auto">
        <button
          className="text-right text-2xl mr-5 bg-transparent text-red-800 transition-all duration-500 hover:bg-gray-300 hover:border-transparent hover:yellow hover:text-2xl px-3 py-1"
          onClick={handleLogout}
        >
          Logout
        </button>
      </li>
    </ul>
  );
};
