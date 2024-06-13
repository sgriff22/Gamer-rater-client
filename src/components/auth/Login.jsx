import { useRef, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useQueryClient } from "@tanstack/react-query";

export const Login = () => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const existDialog = useRef();
  const navigate = useNavigate();
  const queryClient = useQueryClient();

  const handleLogin = (e) => {
    e.preventDefault();
    fetch(`http://localhost:8000/login`, {
      method: "POST",
      body: JSON.stringify({ username, password }),
      headers: {
        "Content-Type": "application/json",
      },
    })
      .then((res) => res.json())
      .then((authInfo) => {
        if (authInfo.token) {
          localStorage.setItem("gamer_token", JSON.stringify(authInfo));
          // Trigger a refetch of the "user" query after successful login
          queryClient.invalidateQueries(["user"]);
          navigate("/welcome");
        } else {
          existDialog.current.showModal();
        }
      });
  };

  return (
    <main className="flex justify-center">
      <dialog className="dialog dialog--auth dialog-style" ref={existDialog}>
        <div>User does not exist</div>
        <button
          className="button--close"
          onClick={() => existDialog.current.close()}
        >
          Close
        </button>
      </dialog>

      <form
        className="flex flex-wrap justify-center py-10 rounded-lg mr-20 ml-20"
        onSubmit={handleLogin}
      >
        <img
          src="public/images/logo/gamer-rater-logo.png"
          alt="Gamer Rater logo"
          className="rounded-2xl w-96 mb-2"
        />
        <h2 className="mb-5 text-center w-full yellow">Please sign in</h2>
        <div className="flex flex-col justify-center">
          <fieldset className="mb-4 flex flex-col">
            <label htmlFor="inputUsername"> Username </label>
            <input
              type="username"
              id="inputUsername"
              value={username}
              onChange={(evt) => setUsername(evt.target.value)}
              className="rounded-md text-xl px-2 py-1 border shadow-sm"
              placeholder="Username"
              required
              autoFocus
            />
          </fieldset>
          <fieldset className="mb-4 flex flex-col">
            <label htmlFor="inputPassword" className="w-3/4">
              {" "}
              Password{" "}
            </label>
            <input
              type="password"
              id="inputPassword"
              value={password}
              onChange={(evt) => setPassword(evt.target.value)}
              className="rounded-md text-xl px-2 py-1 border shadow-sm"
              placeholder="Password"
            />
          </fieldset>
          <fieldset className="w-4/5 mb-4">
            <button>Sign in</button>
          </fieldset>

          <section>
            <Link
              className="text-lg underline hover:text-red-800"
              to="/register"
            >
              Not a member yet?
            </Link>
          </section>
        </div>
      </form>
    </main>
  );
};
