import axios from "axios";
import React from "react";
import { useNavigate, useParams } from "react-router-dom";
import { Navbar, Footer } from "../components";

const UserProfile = () => {
  const reporter_id = localStorage.getItem("id");
  const { id } = useParams();
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
  const [user, setUser] = React.useState([]);
  const [error, setError] = React.useState("");
  const [message, setMessage] = React.useState("");
  const [rating, setRating] = React.useState();

  const onSubmitRating = () => {
    axios
      .post(`http://localhost:8080/rate/rateUser/${id}`, {
        rater_id: reporter_id,
        rate: rating,
      })
      .then((response) => {
        alert("Rating Submitted Successfully!!!");
        console.log(response);
      })
      .catch((error) => {
        console.error(error);
      });
  };

  const onCancel = (event) => {
    setMessage("");
    setRating(null);
    event.preventDefault();
  };

  const onChangeRatings = (event) => {
    setRating(parseInt(event.target.value));
  };

  const fetchUser = () => {
    axios
      .get(`http://localhost:8080/user/retrieve/${id}`)
      .then((response) => {
        console.log(response.data[0]);
        setUser(response.data[0]);
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

  const onSubmit = () => {
    axios
      .post(`http://localhost:8080/insert/report/${reporter_id}/${id}`)
      .then((response) => {
        console.log(response.data);
        alert("User Reported Successfully!!!");
        navigate("/");
      })
      .catch((error) => {
        console.log(error);
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
          <div class="col-md-12">
            <div class="d-flex flex-column align-items-center text-center p-3 py-5">
              <img
                class="rounded-circle mt-5"
                width="150px"
                src="https://st3.depositphotos.com/15648834/17930/v/600/depositphotos_179308454-stock-illustration-unknown-person-silhouette-glasses-profile.jpg"
              />
              <span class="font-weight-bold">{user.user_name}</span>
              <span class="text-black-50">{user.user_email}</span>
              <span> </span>
            </div>
          </div>
          <div class="col-md-12">
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
                    disabled
                    onChange={(event) => setFirsName(event.target.value)}
                  />
                </div>
                <div class="col-md-6">
                  <label class="labels">Last Name</label>
                  <input
                    type="text"
                    class="form-control"
                    value={lastName}
                    disabled
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
                    disabled
                    onChange={(event) => setUsername(event.target.value)}
                  />
                </div>
                <div class="col-md-12">
                  <label class="labels">Mobile Number</label>
                  <input
                    type="number"
                    class="form-control"
                    value={phone}
                    disabled
                    onChange={(event) => setPhone(event.target.value)}
                  />
                </div>
                <div class="col-md-12">
                  <label class="labels">Address</label>
                  <input
                    type="text"
                    class="form-control"
                    value={address}
                    disabled
                    onChange={(event) => setAddress(event.target.value)}
                  />
                </div>
                <div class="col-md-12">
                  <label class="labels">Email Address</label>
                  <input
                    type="text"
                    class="form-control"
                    value={email}
                    disabled
                    onChange={(event) => setEmail(event.target.value)}
                  />
                </div>
              </div>
            </div>
          </div>
        </div>
        <div class="mt-5 text-center">
          {error ? <label style={{ color: "red" }}>* {error} *</label> : ""}
        </div>
        <div class="row">
          <div class="col-md-12">
            <div
              class="comment-box ml-2"
              style={{
                display: "flex",
                justifyContent: "center",
                alignItems: "center",
                flexDirection: "column",
              }}
            >
              <h4>Rate Seller</h4>

              <div class="rating">
                <input
                  type="radio"
                  name="rating"
                  value="5"
                  id="5"
                  onChange={onChangeRatings}
                />
                <label for="5">☆</label>
                <input
                  type="radio"
                  name="rating"
                  value="4"
                  id="4"
                  onChange={onChangeRatings}
                />
                <label for="4">☆</label>
                <input
                  type="radio"
                  name="rating"
                  value="3"
                  id="3"
                  onChange={onChangeRatings}
                />
                <label for="3">☆</label>
                <input
                  type="radio"
                  name="rating"
                  value="2"
                  id="2"
                  onChange={onChangeRatings}
                />
                <label for="2">☆</label>
                <input
                  type="radio"
                  name="rating"
                  value="1"
                  id="1"
                  onChange={onChangeRatings}
                />
                <label for="1">☆</label>
              </div>
              <div class="comment-btn mt-2">
                <div class="row">
                  <div class="col-6">
                    <div class="pull-left">
                      <button class="btn btn-success btn-sm" onClick={onCancel}>
                        Cancel
                      </button>
                    </div>
                  </div>

                  <div class="col-6">
                    <div class="pull-right">
                      <button class="btn btn-success send btn-sm" onClick={onSubmitRating}>
                        Send <i class="fa fa-long-arrow-right ml-1"></i>
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
        <div class="mt-5 text-center">
          <button
            class="btn btn-primary profile-button"
            type="button"
            onClick={onSubmit}
          >
            Report User
          </button>
        </div>
      </div>
      <Footer />
    </>
  );
};

export default UserProfile;
