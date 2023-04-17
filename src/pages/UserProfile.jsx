import axios from "axios";
import React from "react";
import { useNavigate, useParams } from "react-router-dom";
import { Navbar, Footer } from "../components";

const UserProfile = () => {
  const reporter_id = localStorage.getItem("id");
  const { id } = useParams();
  const navigate = useNavigate();
  const [user, setUser] = React.useState([]);
  const [error, setError] = React.useState("");
  const [message, setMessage] = React.useState("");
  const [rating, setRating] = React.useState();

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
          <div class="col-md-3 border-right">
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
        </div>
        <div class="mt-5 text-center">
          {error ? <label style={{ color: "red" }}>* {error} *</label> : ""}
        </div>
        <div class="row">
          <div
            class="col-md-3"
            style={{
              display: "flex",
              justifyContent: "center",
              alignItems: "center",
            }}
          >
            <div
              class="comment-box ml-2"
              style={{
                display: "flex",
                justifyContent: "center",
                alignItems: "center",
                flexDirection: "column",
              }}
            >
              <h4>Rate User</h4>

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

              <div class="comment-btns mt-2">
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
                      <button class="btn btn-success send btn-sm">
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
            class="btn btn-primary profile-button mr-4"
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
