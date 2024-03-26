import { BrowserRouter, Route, Routes } from "react-router-dom";
import { Authorized } from "../auth/Authorized.jsx";
import { Login } from "../auth/Login.jsx";
import { Register } from "../auth/Register.jsx";
import { AllGames } from "../games/AllGames.jsx";
import { GameDetails } from "../games/GameDetails.jsx";

export const ApplicationViews = () => {

  return (
    <BrowserRouter>
      <Routes>
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
        <Route element={<Authorized />}>
          <Route path="/" element={<h1>Welcome to Game Rater</h1>} />
          <Route path="/games" >
            <Route index element={<AllGames />} />
            <Route path=":gameId" element={<GameDetails />} />
          </Route>
        </Route>
      </Routes>
    </BrowserRouter>
  );
};
