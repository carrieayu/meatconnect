import React from "react";
import { Link, useNavigate } from "react-router-dom";
import { Footer, Navbar } from "../components";
import axios from "axios";

const Login = () => {
  const navigate = useNavigate();
  const [username, setUsername] = React.useState("");
  const [password, setPassword] = React.useState("");
  const [error, setError] = React.useState("");

  const onSubmit = (event) => {
    axios
      .post("http://localhost:8080/user/login", {
        username: username,
        password: password,
      })
      .then((response) => {
      
        if (response.data === "Incorrect Username and/or Password") {
          setError("Incorrect Username and/or Password");
          return;
        }
        localStorage.setItem("id", response.data[0].user_id);
        setError("");
        navigate('/');
      })
      .catch((error) => {
        console.log(error);
      });
    event.preventDefault();
  };
  return (
    <>
      <Navbar />
      <div className="container my-3 py-3">
        <h1 className="text-center">Login</h1>
        <hr />
        <div class="row my-4 h-100">
          <div className="col-md-4 col-lg-4 col-sm-8 mx-auto">
            <form onSubmit={onSubmit}>
              <div class="my-3">
                <label for="display-4">Email address</label>
                <input
                  type="text"
                  class="form-control"
                  id="floatingInput"
                  placeholder="username"
                  onChange={(event) => setUsername(event.target.value)}
                />
              </div>
              <div class="my-3">
                <label for="floatingPassword display-4">Password</label>
                <input
                  type="password"
                  class="form-control"
                  id="floatingPassword"
                  placeholder="Password"
                  onChange={(event) => setPassword(event.target.value)}
                />
              </div>
              <div class="my-3">
                {error ? (
                  <label for="floatingPassword display-4" style={{ color: "red" }}>*{error}*</label>
                ) : (
                  ""
                )}
              </div>
              <div className="my-3">
                <p>
                  New Here?{" "}
                  <Link
                    to="/register"
                    className="text-decoration-underline text-info"
                  >
                    Register
                  </Link>{" "}
                </p>
              </div>
              <div className="text-center">
                <button class="my-2 mx-auto btn btn-dark" type="submit">
                  Login
                </button>
              </div>
            </form>
          </div>
        </div>
      </div>
      <Footer />
    </>
  );
};

export default Login;
