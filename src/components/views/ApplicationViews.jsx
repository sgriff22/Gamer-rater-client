import { Route, Routes } from "react-router-dom";
import { Authorized } from "../auth/Authorized.jsx";
import { Login } from "../auth/Login.jsx";
import { Register } from "../auth/Register.jsx";
import { AllGames } from "../games/AllGames.jsx";
import { GameDetails } from "../games/GameDetails.jsx";
import { NewGameForm } from "../forms/NewGameForm.jsx";
import { Welcome } from "../welcome/Welcome.jsx";
import { ReviewForm } from "../forms/ReviewForm.jsx";

export const ApplicationViews = () => {
  return (
    <Routes>
      <Route path="/login" element={<Login />} />
      <Route path="/register" element={<Register />} />
      <Route element={<Authorized />}>
        <Route path="/" element={<Welcome />} />
        <Route path="/games">
          <Route index element={<AllGames />} />
          <Route path=":gameId">
            <Route index element={<GameDetails />} />
            <Route path="review" element={<ReviewForm />} />
          </Route>
        </Route>
        <Route path="/newGame" element={<NewGameForm />} />
      </Route>
    </Routes>
  );
};
