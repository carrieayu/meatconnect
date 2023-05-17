import React from "react";
import { Footer, Navbar } from "../components";
import "../assets/css/profile.css";
import axios from "axios";
import { useNavigate } from "react-router-dom";

const Profile = () => {
  const navigate = useNavigate();
  const [firstName, setFirstName] = React.useState("");
  const [lastName, setLastName] = React.useState("");
  const [phone, setPhone] = React.useState("");
  const [address, setAddress] = React.useState("");
  const [email, setEmail] = React.useState("");
  const [username, setUsername] = React.useState("");
  const [oldPass, setOldPass] = React.useState("");
  const [newPass, setNewPass] = React.useState("");
  const [confirmPass, setConfirmPass] = React.useState("");
  const [error, setError] = React.useState("");
  const [selectedFile, setSelectedFile] = React.useState(null);
  const [selectedFileUrl, setSelectedFileUrl] = React.useState("");
  const [question, setQuestion] = React.useState([]);
  const [questionOne, setQuestionOne] = React.useState();
  const [questionOneId, setQuestionOneId] = React.useState();
  const [questionTwo, setQuestionTwo] = React.useState();
  const [questionTwoId, setQuestionTwoId] = React.useState();
  const [questionThree, setQuestionThree] = React.useState();
  const [questionThreeId, setQuestionThreeId] = React.useState();
  const [answerOne, setAnswerOne] = React.useState("");
  const [answerTwo, setAnswerTwo] = React.useState("");
  const [answerThree, setAnswerThree] = React.useState("");

  const onChangePass = (event) => {
    axios
      .get(`http://localhost:8080/user/retrieve/${localStorage.getItem("id")}`)
      .then((response) => {
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
    const confirmed = window.confirm(
      "Are you sure you want to Delete/Deactivate your Account?"
    );
    if (confirmed) {
      axios
        .put(
          `http://localhost:8080/user/deactivate/${localStorage.getItem("id")}`
        )
        .then((response) => {
          localStorage.clear();
          alert("Account Deleted Successfully");
          navigate("/");
        })
        .catch((error) => {
          console.error(error);
        });
    } else {
    }
    event.preventDefault();
  };

  const onSecuritySubmit = () => {
    axios
      .get(
        `http://localhost:8080/security_question/retrieveByUser/${localStorage.getItem(
          "id"
        )}`
      )
      .then((res) => {
        if (res.data.length) {
          if (questionOne) {
            axios
              .put(
                `http://localhost:8080/security_question/update/${questionOneId}`,
                {
                  answer: answerOne,
                  question_id: questionOne,
                }
              )
              .then((res) => {
                console.log(res);
              })
              .catch((err) => {
                console.error(err);
              });
          }

          if (questionTwo) {
            axios
              .put(
                `http://localhost:8080/security_question/update/${questionTwoId}`,
                {
                  answer: answerTwo,
                  question_id: questionTwo,
                }
              )
              .then((res) => {
                console.log(res);
              })
              .catch((err) => {
                console.error(err);
              });
          }

          if (questionThree) {
            axios
              .put(
                `http://localhost:8080/security_question/update/${questionThreeId}`,
                {
                  answer: answerThree,
                  question_id: questionThree,
                }
              )
              .then((res) => {
                console.log(res);
              })
              .catch((err) => {
                console.error(err);
              });
          }
        } else {
          if (questionOne) {
            axios
              .post(
                `http://localhost:8080/security_question/insert/${questionOne}/${localStorage.getItem(
                  "id"
                )}`,
                {
                  answer: answerOne,
                  number: 1,
                }
              )
              .then((res) => {
                console.log(res);
              })
              .catch((err) => {
                console.error(err);
              });
          }

          if (questionTwo) {
            axios
              .post(
                `http://localhost:8080/security_question/insert/${questionTwo}/${localStorage.getItem(
                  "id"
                )}`,
                {
                  answer: answerTwo,
                  number: 2,
                }
              )
              .then((res) => {
                console.log(res);
              })
              .catch((err) => {
                console.error(err);
              });
          }

          if (questionThree) {
            axios
              .post(
                `http://localhost:8080/security_question/insert/${questionThree}/${localStorage.getItem(
                  "id"
                )}`,
                {
                  answer: answerThree,
                  number: 3,
                }
              )
              .then((res) => {
                console.log(res);
              })
              .catch((err) => {
                console.error(err);
              });
          }
        }
      })
      .catch((err) => {
        console.error(err);
      });
  };

  const onSubmit = (event) => {
    if (newPass !== confirmPass) {
      setError("Password Does not match");
      event.preventDefault();
      return;
    }

    const formData = new FormData();
    formData.append("id", localStorage.getItem("id"));
    formData.append("progress", 1);
    formData.append("user_contacts", phone);
    formData.append("name", email);
    formData.append("address", address);
    formData.append("username", username);
    formData.append("password", newPass === "" ? oldPass : newPass);
    formData.append("firstName", firstName);
    formData.append("lastName", lastName);
    formData.append("image", selectedFile);

    axios
      .put(`http://localhost:8080/user/update`, formData, {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      })
      .then((response) => {
        alert("User Profile Updated Successfully");
        setError("");
      })
      .catch((error) => {
        console.error(error);
      });
  };

  const fetchQuestion = () => {
    axios
      .get(`http://localhost:8080/questions/retrieve`)
      .then((res) => {
        console.log(res.data);
        setQuestion(res.data);
      })
      .catch((err) => {
        console.error(err);
      });
  };

  const fetchSecurityQuestion = () => {
    axios
      .get(
        `http://localhost:8080/security_question/retrieveByUser/${localStorage.getItem(
          "id"
        )}`
      )
      .then((res) => {
        res.data.map((d, index) => {
          if (d.question_number === 1) {
            setQuestionOne(d.question_id);
            setAnswerOne(d.answer);
            setQuestionOneId(d.id);
          } else if (d.question_number === 2) {
            setQuestionTwo(d.question_id);
            setAnswerTwo(d.answer);
            setQuestionTwoId(d.id);
          } else if (d.question_number === 3) {
            setQuestionThree(d.question_id);
            setAnswerThree(d.answer);
            setQuestionThreeId(d.id);
          }
        });
      })
      .catch((err) => {
        console.error(err);
      });
  };

  const fetchUser = () => {
    const user_id = localStorage.getItem("id");

    axios
      .get(`http://localhost:8080/user/retrieve/${user_id}`)
      .then((response) => {
        setFirstName(response.data.user[0].first_name);
        setLastName(response.data.user[0].last_name);
        setPhone(response.data.user[0].user_contacts);
        setAddress(response.data.user[0].user_address);
        setEmail(response.data.user[0].user_email);
        setUsername(response.data.user[0].user_name);
        setOldPass(response.data.user[0].user_password);
        setSelectedFileUrl(response.data.user[0].user_photo);
        console.log(selectedFileUrl);
      })
      .catch((error) => {
        console.error(error);
      });
  };

  const handleFileChange = (event) => {
    const file = event.target.files[0];
    setSelectedFile(file);
    setSelectedFileUrl(URL.createObjectURL(file));
  };

  React.useEffect(() => {
    fetchSecurityQuestion();
    fetchQuestion();
    fetchUser();
  }, []);

  React.useEffect(() => {
    return () => URL.revokeObjectURL(selectedFileUrl);
  }, [selectedFileUrl]);

  return (
    <>
      <Navbar />
      <div class="container rounded bg-white mt-5 mb-5">
        <div class="row">
          <div class="col-md-3 border-right">
            <div class="d-flex flex-column align-items-center text-center p-3 py-5">
              {
                <img
                  class="rounded-circle mt-5"
                  width="150px"
                  src={
                    selectedFileUrl
                      ? `data:image/jpeg;base64,${selectedFileUrl}`
                      : `https://st3.depositphotos.com/15648834/17930/v/600/depositphotos_179308454-stock-illustration-unknown-person-silhouette-glasses-profile.jpg`
                  }
                />
              }
              <input type="file" onChange={handleFileChange} />

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
                    onChange={(event) => setFirstName(event.target.value)}
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
            <div class="p-3 py-5">
              <div class="d-flex justify-content-between align-items-center experience">
                <span>Update Security Questions</span>
              </div>
              <div class="col-md-12">
                <label class="labels">Question 1</label>
                <select
                  class="form-select"
                  value={questionOne}
                  onChange={(e) => setQuestionOne(e.target.value)}
                  aria-label="Default select example"
                >
                  <option selected>Open this select menu</option>
                  {question?.map((d) => (
                    <option value={d.id}>{d.question}</option>
                  ))}
                </select>
              </div>
              <div class="col-md-12">
                <label class="labels">Answer One</label>
                <input
                  type="text"
                  class="form-control"
                  placeholder="Answer One"
                  value={answerOne}
                  onChange={(event) => setAnswerOne(event.target.value)}
                />
              </div>
              <div class="col-md-12">
                <label class="labels">Question 2</label>
                <select
                  class="form-select"
                  value={questionTwo}
                  onChange={(e) => setQuestionTwo(e.target.value)}
                  aria-label="Default select example"
                >
                  <option selected>Open this select menu</option>
                  {question?.map((d) => (
                    <option value={d.id}>{d.question}</option>
                  ))}
                </select>
              </div>
              <div class="col-md-12">
                <label class="labels">Answer Two</label>
                <input
                  type="text"
                  class="form-control"
                  placeholder="Answer One"
                  value={answerTwo}
                  onChange={(event) => setAnswerTwo(event.target.value)}
                />
              </div>
              <div class="col-md-12">
                <label class="labels">Question 3</label>
                <select
                  class="form-select"
                  value={questionThree}
                  onChange={(e) => setQuestionThree(e.target.value)}
                  aria-label="Default select example"
                >
                  <option selected>Open this select menu</option>
                  {question?.map((d) => (
                    <option value={d.id}>{d.question}</option>
                  ))}
                </select>
              </div>
              <div class="col-md-12">
                <label class="labels">Answer Three</label>
                <input
                  type="text"
                  class="form-control"
                  placeholder="Answer One"
                  value={answerThree}
                  onChange={(event) => setAnswerThree(event.target.value)}
                />
              </div>
              <div class="col-md-12 mt-5 text-center">
                <button
                  class="btn btn-primary profile-button mr-4"
                  type="button"
                  onClick={onSecuritySubmit}
                >
                  Submit Security Question
                </button>
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
