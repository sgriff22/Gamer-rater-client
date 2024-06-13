import { useRef, useState } from "react";
import { Link, useNavigate } from "react-router-dom";

export const Register = () => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const existDialog = useRef();
  const navigate = useNavigate();

  const handleRegister = (e) => {
    e.preventDefault();
    fetch(`http://localhost:8000/register`, {
      method: "POST",
      body: JSON.stringify({
        username,
        password,
        first_name: firstName,
        last_name: lastName,
      }),
      headers: {
        "Content-Type": "application/json",
      },
    })
      .then((res) => res.json())
      .then((authInfo) => {
        if (authInfo && authInfo.token) {
          localStorage.setItem("gamer_token", JSON.stringify(authInfo));
          navigate("/welcome");
        } else {
          existDialog.current.showModal();
        }
      });
  };

  return (
    <main className="flex justify-center">
      <dialog className="dialog dialog--auth dialog-style" ref={existDialog}>
        <div>User already exists</div>
        <button
          className="button--close"
          onClick={() => existDialog.current.close()}
        >
          Close
        </button>
      </dialog>

      <form
        className="flex flex-wrap justify-center py-10 rounded-lg mr-20 ml-20"
        onSubmit={handleRegister}
      >
        <img
          src="public/images/logo/gamer-rater-logo.png"
          alt="Gamer Rater logo"
          className="rounded-2xl w-96 mb-2"
        />
        <h2 className="mb-5 text-center w-full yellow">Register new account</h2>
        <div className="flex flex-col justify-center">
          <fieldset className="mb-4 flex flex-col">
            <label htmlFor="firstName"> First name </label>
            <input
              type="text"
              id="firstName"
              value={firstName}
              onChange={(evt) => setFirstName(evt.target.value)}
              className="rounded-md text-xl px-2 py-1 border shadow-sm"
              placeholder="First Name"
              required
              autoFocus
            />
          </fieldset>
          <fieldset className="mb-4 flex flex-col">
            <label htmlFor="lastName"> Last name </label>
            <input
              type="text"
              id="lastName"
              value={lastName}
              onChange={(evt) => setLastName(evt.target.value)}
              className="rounded-md text-xl px-2 py-1 border shadow-sm"
              placeholder="Last Name"
              required
              autoFocus
            />
          </fieldset>
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
            <label htmlFor="inputPassword"> Password </label>
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
            <button>Register</button>
          </fieldset>

          <section>
            <Link className="text-lg underline hover:text-red-800" to="/">
              Already have an account?
            </Link>
          </section>
        </div>
      </form>
    </main>
  );
};
