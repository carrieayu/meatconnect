import React from "react";
import { Footer, Navbar } from "../components";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";

const Admin = () => {
  const navigate = useNavigate();

  const [firstName, setFirstName] = React.useState("");
  const [lastName, setLastName] = React.useState("");
  const [email, setEmail] = React.useState("");
  const [address, setAddress] = React.useState("");
  const [username, setUsername] = React.useState("");
  const [contacts, setContacts] = React.useState("");
  const [password, setPassword] = React.useState("");
  const [confirmPass, setConfirmPass] = React.useState("");
  const [error, setError] = React.useState("");

  if (localStorage.getItem() === "admin@gmail.com") {
    navigate("/");
  }
  const onSubmit = (event) => {
    if (password !== confirmPass) {
      setError("Password does not match");
      event.preventDefault();
      return;
    }

    if (
      email === "" ||
      username === "" ||
      password === "" ||
      confirmPass === ""
    ) {
      setError("All fields are required");
      event.preventDefault();
      return;
    }

    axios
      .post("http://localhost:8080/user/register", {
        progress: 1,
        contacts: contacts,
        address: address,
        name: email,
        username: username,
        password: password,
        firstName: firstName,
        lastName: lastName,
      })
      .then((response) => {
        alert("User Registered Successfully");
        navigate("/login");
      })
      .catch((error) => {
        console.error(error);
      });
    event.preventDefault();
  };

  return (
    <>
      <Navbar />
      <div className="container my-3 py-3">
        <h1 className="text-center">Register</h1>
        <hr />
        <div class="row my-4 h-100">
          <div className="col-md-4 col-lg-4 col-sm-8 mx-auto">
            <form onSubmit={onSubmit}>
              <div class="form my-3">
                <label for="Email">First Name</label>
                <input
                  type="text"
                  class="form-control"
                  id="firstName"
                  placeholder="Enter First Name"
                  onChange={(event) => {
                    setFirstName(event.target.value);
                  }}
                />
              </div>
              <div class="form my-3">
                <label for="Email">Last Name</label>
                <input
                  type="text"
                  class="form-control"
                  id="LastName"
                  placeholder="Enter Last Name"
                  onChange={(event) => {
                    setLastName(event.target.value);
                  }}
                />
              </div>
              <div class="form my-3">
                <label for="Email">Email address</label>
                <input
                  type="email"
                  class="form-control"
                  id="Email"
                  placeholder="name@example.com"
                  onChange={(event) => {
                    setEmail(event.target.value);
                  }}
                />
              </div>

              <div class="form my-3">
                <label for="Name">Address</label>
                <input
                  type="text"
                  class="form-control"
                  id="address"
                  placeholder="Enter Your Name"
                  onChange={(event) => {
                    setAddress(event.target.value);
                  }}
                />
              </div>
              <div class="form my-3">
                <label for="Name">Username</label>
                <input
                  type="text"
                  class="form-control"
                  id="username"
                  placeholder="Enter Your Name"
                  onChange={(event) => {
                    setUsername(event.target.value);
                  }}
                />
              </div>
              <div class="form my-3">
                <label for="Name">Contacts</label>
                <input
                  type="text"
                  class="form-control"
                  id="contact"
                  placeholder="Enter Your Name"
                  onChange={(event) => {
                    setContacts(event.target.value);
                  }}
                />
              </div>
              <div class="form  my-3">
                <label for="Password">Password</label>
                <input
                  type="password"
                  class="form-control"
                  id="Password"
                  placeholder="Password"
                  onChange={(event) => {
                    setPassword(event.target.value);
                  }}
                />
              </div>
              <div class="form  my-3">
                <label for="Password">Confirm Password</label>
                <input
                  type="password"
                  class="form-control"
                  id="Password"
                  placeholder="Password"
                  onChange={(event) => {
                    setConfirmPass(event.target.value);
                  }}
                />
              </div>
              <div class="form" style={{ color: "red" }}>
                <label>{error}</label>
              </div>
              <div className="my-3">
                <p>
                  Already has an account?{" "}
                  <Link
                    to="/login"
                    className="text-decoration-underline text-info"
                  >
                    Login
                  </Link>{" "}
                </p>
              </div>
              <div className="text-center">
                <button class="my-2 mx-auto btn btn-dark" type="submit">
                  Register
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

export default Admin;
