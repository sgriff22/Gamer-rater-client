import { BrowserRouter, Route, Routes } from "react-router-dom";
import { Authorized } from "../auth/Authorized.jsx";
import { Login } from "../auth/Login.jsx";
import { Register } from "../auth/Register.jsx";

export const ApplicationViews = () => {
  //   const [rocksState, setRocksState] = useState([
  //     {
  //       id: 1,
  //       name: "Sample",
  //       type: {
  //         id: 1,
  //         label: "Volcanic",
  //       },
  //       user: {
  //         first_name: "",
  //         last_name: "",
  //       },
  //     },
  //   ]);

  //   const fetchRocksFromAPI = async (showAll) => {
  //     let url = "http://localhost:8000/rocks"

  //     if(showAll !== true) {
  //       url = "http://localhost:8000/rocks?owner=current"
  //     }
  //     const response = await fetch(url, {
  //       headers: {
  //         Authorization: `Token ${
  //           JSON.parse(localStorage.getItem("rock_token")).token
  //         }`,
  //       },
  //     });
  //     const rocks = await response.json();
  //     setRocksState(rocks);
  //   };

  return (
    <BrowserRouter>
      <Routes>
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
        <Route element={<Authorized />}>
          <Route path="/" element={<h1>Welcome to Game Rater</h1>} />
          <Route path="/games" >
            <Route index element={<>Games</>} />
            <Route path=":gameId" element={<>Game Details</>} />
          </Route>
        </Route>
      </Routes>
    </BrowserRouter>
  );
};
