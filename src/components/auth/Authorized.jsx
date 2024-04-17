import { Navigate, Outlet } from "react-router-dom";
import { NavBar } from "../nav/Navbar";

export const Authorized = () => {
  if (localStorage.getItem("gamer_token")) {
    return (
      <>
        <NavBar />
        <main className="p-4">
          <Outlet />
        </main>
      </>
    );
  }
  return <Navigate to="/login" replace />;
};
