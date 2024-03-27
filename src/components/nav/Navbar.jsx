import { NavLink, useNavigate } from "react-router-dom";

export const NavBar = () => {
  const navigate = useNavigate();
  return (
    <ul className="navbar pb-5 bg-gray-300 flex items-center">
      <li className="navbar__item pl-10 pt-5">
        <NavLink
          className="text-left text-red-800  hover:text-gray-950"
          to={"/games"}
        >
          Games
        </NavLink>
      </li>

      <li className="navbar__item ml-auto pt-5">
        <button
          className="text-right text-2xl mr-10 bg-transparent text-red-800 hover:bg-gray-300 hover:border-transparent hover:text-gray-950 hover:text-2xl px-3 py-1"
          onClick={() => {
            localStorage.removeItem("gamer_token");
            navigate("/login");
          }}
        >
          Logout
        </button>
      </li>
    </ul>
  );
};
