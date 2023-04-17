import React from "react";
import { Footer, Navbar } from "../components";
import "../assets/css/profile.css";
import axios from "axios";
import { useNavigate } from "react-router-dom";

const Profile = () => {
  const navigate = useNavigate();
  const [firstName, setFirsName] = React.useState("");
  const [lastName, setLastName] = React.useState("");
  const [phone, setPhone] = React.useState("");
  const [address, setAddress] = React.useState("");
  const [email, setEmail] = React.useState("");
  const [username, setUsername] = React.useState("");
  const [oldPass, setOldPass] = React.useState("");
  const [newPass, setNewPass] = React.useState("");
  const [confirmPass, setConfirmPass] = React.useState("");
  const [error, setError] = React.useState("");

  const onChangePass = (event) => {
    axios
      .get(`http://localhost:8080/user/retrieve/${localStorage.getItem("id")}`)
      .then((response) => {
        console.log(response);
        if (event.target.value !== response.data[0].user_password) {
          setError("Password Does not Match");
          event.preventDefault();
          return;
        }
        setError("");
        setOldPass(response.data[0].user_password);
      })
      .catch((error) => {
        console.error(error);
        event.preventDefault();
      });
  };

  const onDeleteAccnt = (event) => {
    const confirmed = window.confirm("Are you sure you want to Delete/Deactivate your Account?");
    if(confirmed){
      axios
        .put(
          `http://localhost:8080/user/deactivate/${localStorage.getItem("id")}`
        )
        .then((response) => {
          console.log(response);
          localStorage.clear();
          alert("Account Deleted Successfully");
          navigate("/");
        })
        .catch((error) => {
          console.error(error);
        });
    }else{
      
    }
    event.preventDefault();
  };

  const onSubmit = (event) => {
    if (newPass !== confirmPass) {
      setError("Password Does not match");
      event.preventDefault();
      return;
    }

    axios
      .post(`http://localhost:8080/user/update`, {
        id: localStorage.getItem("id"),
        progress: 1,
        contacts: phone,
        address: address,
        name: email,
        username: username,
        password: newPass === "" ? oldPass : newPass,
        firstName: firstName,
        lastName: lastName,
      })
      .then((response) => {
        console.log(response.data);
        alert("User Profile Updated Successfully");
        setError("");
      })
      .catch((error) => {
        console.error(error);
      });
  };

  const fetchUser = () => {
    const user_id = localStorage.getItem("id");

    axios
      .get(`http://localhost:8080/user/retrieve/${user_id}`)
      .then((response) => {
        setFirsName(response.data[0].first_name);
        setLastName(response.data[0].last_name);
        setPhone(response.data[0].user_contacts);
        setAddress(response.data[0].user_address);
        setEmail(response.data[0].user_email);
        setUsername(response.data[0].user_name);
        setOldPass(response.data[0].user_password);
      })
      .catch((error) => {
        console.error(error);
      });
  };

  React.useEffect(() => {
    fetchUser();
  }, []);

  return (
    <>
      <Navbar />
      <div class="container rounded bg-white mt-5 mb-5">
        <div class="row">
          <div class="col-md-3 border-right">
            <div class="d-flex flex-column align-items-center text-center p-3 py-5">
              <img
                class="rounded-circle mt-5"
                width="150px"
                src="https://st3.depositphotos.com/15648834/17930/v/600/depositphotos_179308454-stock-illustration-unknown-person-silhouette-glasses-profile.jpg"
              />
              <span class="font-weight-bold">
                {firstName} {lastName}
              </span>
              <span class="text-black-50">{email}</span>
              <span> </span>
            </div>
          </div>
          <div class="col-md-5 border-right">
            <div class="p-3 py-5">
              <div class="d-flex justify-content-between align-items-center mb-3">
                <h4 class="text-right">Profile Settings</h4>
              </div>
              <div class="row mt-2">
                <div class="col-md-6">
                  <label class="labels">First Name</label>
                  <input
                    type="text"
                    class="form-control"
                    value={firstName}
                    onChange={(event) => setFirsName(event.target.value)}
                  />
                </div>
                <div class="col-md-6">
                  <label class="labels">Last Name</label>
                  <input
                    type="text"
                    class="form-control"
                    value={lastName}
                    onChange={(event) => setLastName(event.target.value)}
                  />
                </div>
              </div>
              <div class="row mt-3">
                <div class="col-md-12">
                  <label class="labels">Username</label>
                  <input
                    type="text"
                    class="form-control"
                    value={username}
                    onChange={(event) => setUsername(event.target.value)}
                  />
                </div>
                <div class="col-md-12">
                  <label class="labels">Mobile Number</label>
                  <input
                    type="number"
                    class="form-control"
                    value={phone}
                    onChange={(event) => setPhone(event.target.value)}
                  />
                </div>
                <div class="col-md-12">
                  <label class="labels">Address</label>
                  <input
                    type="text"
                    class="form-control"
                    value={address}
                    onChange={(event) => setAddress(event.target.value)}
                  />
                </div>
                <div class="col-md-12">
                  <label class="labels">Email Address</label>
                  <input
                    type="text"
                    class="form-control"
                    value={email}
                    onChange={(event) => setEmail(event.target.value)}
                  />
                </div>
              </div>
            </div>
          </div>
          <div class="col-md-4">
            <div class="p-3 py-5">
              <div class="d-flex justify-content-between align-items-center experience">
                <span>Update Password</span>
              </div>
              <br />
              <div class="col-md-12">
                <label class="labels">Old Password</label>
                <input
                  type="password"
                  class="form-control"
                  placeholder="Old Password"
                  onChange={(event) => onChangePass(event)}
                />
              </div>{" "}
              <br />
              <div class="col-md-12">
                <label class="labels">New Password</label>
                <input
                  type="password"
                  class="form-control"
                  placeholder="New Password"
                  onChange={(event) => setNewPass(event.target.value)}
                />
              </div>
              <div class="col-md-12">
                <label class="labels">Confirm Password</label>
                <input
                  type="password"
                  class="form-control"
                  placeholder="Confirm Password"
                  onChange={(event) => setConfirmPass(event.target.value)}
                />
              </div>
            </div>
          </div>
        </div>
        <div class="mt-5 text-center">
          {error ? <label style={{ color: "red" }}>* {error} *</label> : ""}
        </div>
        <div class="mt-5 text-center">
          <button
            class="btn btn-primary profile-button mr-4"
            type="button"
            onClick={onSubmit}
          >
            Update Profile
          </button>
          <button
            class="btn btn-primary profile-button"
            type="button"
            onClick={onDeleteAccnt}
          >
            Deactivate Account / Delete Account
          </button>
        </div>
      </div>
      <Footer />
    </>
  );
};

export default Profile;
