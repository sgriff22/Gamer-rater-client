import { useRef, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import "./Login.css";

export const Login = () => {
  const [username, setUsername] = useState("tyler@hilliard.com");
  const [password, setPassword] = useState("hilliard");
  const existDialog = useRef();
  const navigate = useNavigate();

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
          navigate("/");
        } else {
          existDialog.current.showModal();
        }
      });
  };

  return (
    <main className="container--login mt-20">
      <dialog className="dialog dialog--auth" ref={existDialog}>
        <div>User does not exist</div>
        <button
          className="button--close"
          onClick={() => existDialog.current.close()}
        >
          Close
        </button>
      </dialog>

      <section>
        <form className="form--login border shadow-md" onSubmit={handleLogin}>
          <h1 className="text-center mt-7 mb-3 text-red-800">Gamer Rater</h1>
          <h2 className="text-xl mb-5 text-center">Please sign in</h2>
          <fieldset className="mb-4">
            <label htmlFor="inputUsername"> Username </label>
            <input
              type="username"
              id="inputUsername"
              value={username}
              onChange={(evt) => setUsername(evt.target.value)}
              className="form-control"
              placeholder="Username"
              required
              autoFocus
            />
          </fieldset>
          <fieldset className="mb-4">
            <label htmlFor="inputPassword"> Password </label>
            <input
              type="password"
              id="inputPassword"
              value={password}
              onChange={(evt) => setPassword(evt.target.value)}
              className="form-control"
              placeholder="Password"
            />
          </fieldset>
          <fieldset>
            <button>Sign in</button>
          </fieldset>
          <div className="loginLinks">
            <section className="link--register">
              <Link
                className="text-lg underline over:text-red-800"
                to="/register"
              >
                Not a member yet?
              </Link>
            </section>
          </div>
        </form>
      </section>
    </main>
  );
};
