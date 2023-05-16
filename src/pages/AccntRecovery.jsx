import React from "react";
import { Footer, Navbar } from "../components";
import axios from "axios";
import { useNavigate } from "react-router-dom";

const AccntRecovery = () => {
  const navigate = useNavigate();
  const [recover, setRecover] = React.useState(false);
  const [email, setEmail] = React.useState("");
  const [password, setPassword] = React.useState("");
  const [confirmPass, setConfirmPass] = React.useState("");

  const onSubmit = () => {
    if (email === "") {
      alert("Email Field is required!");
      return;
    }
    setRecover(true);
  };

  const onResetPassword = () => {
    if (password === "" || confirmPass === "") {
      alert("Please input password!!");
      return;
    }

    if (confirmPass !== password) {
      alert("Password does not match");
      return;
    }

    axios
      .put(`http://localhost:8080/user/updatePass/${email}`, {
        password: password,
      })
      .then((res) => {
        alert("You password has been reset!!");
        navigate("/login");
      })
      .catch((err) => {
        console.log(err);
      });
  };

  return (
    <>
      <Navbar />
      <div className="container my-3 py-3">
        <h1 className="text-center">Login</h1>
        <hr />
        <div class="row my-4 h-100">
          <div className="col-md-4 col-lg-4 col-sm-8 mx-auto">
            {!recover ? (
              <>
                <div class="my-3">
                  <label for="display-4">Email address</label>
                  <input
                    type="text"
                    class="form-control"
                    id="floatingInput"
                    placeholder="Email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                  />
                </div>
                <div className="text-center">
                  <button class="my-2 mx-auto btn btn-dark" onClick={onSubmit}>
                    Recover Account
                  </button>
                </div>
              </>
            ) : (
              <>
                <div class="form  my-3">
                  <label for="Password">Password</label>
                  <input
                    type="password"
                    class="form-control"
                    id="Password"
                    placeholder="Password"
                    value={password}
                    required
                    onChange={(e) => setPassword(e.target.value)}
                  />
                </div>
                <div class="form  my-3">
                  <label for="Password">Confirm Password</label>
                  <input
                    type="password"
                    class="form-control"
                    id="Password"
                    placeholder="Password"
                    value={confirmPass}
                    required
                    onChange={(e) => setConfirmPass(e.target.value)}
                  />
                </div>
                <div className="text-center">
                  <button
                    class="my-2 mx-auto btn btn-dark"
                    onClick={onResetPassword}
                  >
                    Reset Password
                  </button>
                </div>
              </>
            )}
          </div>
        </div>
      </div>
      <Footer />
    </>
  );
};

export default AccntRecovery;
