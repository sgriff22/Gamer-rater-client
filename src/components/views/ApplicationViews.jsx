import { BrowserRouter, Route, Routes } from "react-router-dom";
import { Authorized } from "../auth/Authorized.jsx";
import { Login } from "../auth/Login.jsx";
import { Register } from "../auth/Register.jsx";
import { AllGames } from "../games/AllGames.jsx";
import { GameDetails } from "../games/GameDetails.jsx";
import { NewGameForm } from "../forms/NewGameForm.jsx";
import { Welcome } from "../welcome/Welcome.jsx";

export const ApplicationViews = () => {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
        <Route element={<Authorized />}>
          <Route path="/" element={<Welcome />} />
          <Route path="/games">
            <Route index element={<AllGames />} />
            <Route path=":gameId" element={<GameDetails />} />
          </Route>
          <Route path="/newGame" element={<NewGameForm />} />
        </Route>
      </Routes>
    </BrowserRouter>
  );
};
