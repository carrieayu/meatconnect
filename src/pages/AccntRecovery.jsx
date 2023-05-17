import React from "react";
import { Footer, Navbar } from "../components";
import axios from "axios";
import { useNavigate } from "react-router-dom";

const AccntRecovery = () => {
  const navigate = useNavigate();
  const [recover, setRecover] = React.useState(false);
  const [secQuest, setSecQuest] = React.useState(false);
  const [email, setEmail] = React.useState("");
  const [password, setPassword] = React.useState("");
  const [confirmPass, setConfirmPass] = React.useState("");
  const [questPass, setQuestPass] = React.useState(false);
  const [questionOne, setQuestionOne] = React.useState();
  const [questionOneId, setQuestionOneId] = React.useState();
  const [questionTwo, setQuestionTwo] = React.useState();
  const [questionTwoId, setQuestionTwoId] = React.useState();
  const [questionThree, setQuestionThree] = React.useState();
  const [questionThreeId, setQuestionThreeId] = React.useState();
  const [answerOne, setAnswerOne] = React.useState("");
  const [answerTwo, setAnswerTwo] = React.useState("");
  const [answerThree, setAnswerThree] = React.useState("");

  const onSubmitAnswer = () => {
    let oneCheck = false;
    let twoCheck = false;
    let threeCheck = false;

    const checkAnswers = () => {
      if (oneCheck && twoCheck && threeCheck) {
        setSecQuest(false);
        setQuestPass(true);
      }
    };

    if (questionOneId) {
      axios
        .post(`http://localhost:8080/questions/checkAnswer/${questionOneId}`, {
          answer: answerOne,
        })
        .then((res) => {
          console.log(res.data.length);
          if (res.data.length > 0) {
            oneCheck = true;
          }
          checkAnswers();
        })
        .catch((err) => {
          console.error(err);
          alert("Error occurred while checking the answer. Please try again.");
        });
    }

    if (questionTwoId) {
      axios
        .post(`http://localhost:8080/questions/checkAnswer/${questionTwoId}`, {
          answer: answerTwo,
        })
        .then((res) => {
          console.log(res.data.length);
          if (res.data.length > 0) {
            twoCheck = true;
          }
          checkAnswers();
        })
        .catch((err) => {
          console.error(err);
          alert("Error occurred while checking the answer. Please try again.");
        });
    }

    if (questionThreeId) {
      axios
        .post(
          `http://localhost:8080/questions/checkAnswer/${questionThreeId}`,
          {
            answer: answerThree,
          }
        )
        .then((res) => {
          console.log(res.data.length);
          if (res.data.length > 0) {
            threeCheck = true;
          }
          checkAnswers();
        })
        .catch((err) => {
          console.error(err);
          alert("Error occurred while checking the answer. Please try again.");
        });
    }
  };

  const onSubmit = () => {
    if (email === "") {
      alert("Email field is required!");
      return;
    }

    axios
      .get(`http://localhost:8080/user/retrieveEmail/${email}`)
      .then((res) => {
        if (res.data) {
          axios
            .get(
              `http://localhost:8080/security_question/retrieveByUserWithQuestion/${res.data.user_id}`
            )
            .then((result) => {
              if (result.data) {
                setRecover(true);
                setSecQuest(true);
                result.data.map((d, index) => {
                  if (d.question_number === 1) {
                    setQuestionOne(d.question);
                    setQuestionOneId(d.seucrity_id);
                  } else if (d.question_number === 2) {
                    setQuestionTwo(d.question);
                    setQuestionTwoId(d.seucrity_id);
                  } else if (d.question_number === 3) {
                    setQuestionThree(d.question);
                    setQuestionThreeId(d.seucrity_id);
                  }
                });
              } else {
                alert(
                  "Email not found or user does not have security questions set."
                );
              }
            })
            .catch((err) => {
              alert("Error retrieving security questions.");
              console.error(err);
            });
        } else {
          alert("Email not found.");
        }
      })
      .catch((err) => {
        alert("Error retrieving email.");
        console.error(err);
      });
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
        <h1 className="text-center">Recover Account</h1>
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
            ) : null}
            {secQuest ? (
              <div class="p-3 py-5">
                <div class="d-flex justify-content-between align-items-center experience">
                  <span>Security Questions</span>
                </div>
                <br />
                <div class="col-md-12">
                  <span>{questionOne}</span>
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
                  <span>{questionTwo}</span>
                </div>
                <div class="col-md-12">
                  <label class="labels">Answer One</label>
                  <input
                    type="text"
                    class="form-control"
                    placeholder="Answer Two"
                    value={answerTwo}
                    onChange={(event) => setAnswerTwo(event.target.value)}
                  />
                </div>
                <div class="col-md-12">
                  <span>{questionThree}</span>
                </div>
                <div class="col-md-12">
                  <label class="labels">Answer One</label>
                  <input
                    type="text"
                    class="form-control"
                    placeholder="Answer Three"
                    value={answerThree}
                    onChange={(event) => setAnswerThree(event.target.value)}
                  />
                </div>
                <div className="text-center">
                  <button
                    class="my-2 mx-auto btn btn-dark"
                    onClick={onSubmitAnswer}
                  >
                    Submit Answer
                  </button>
                </div>
              </div>
            ) : null}
            {questPass ? (
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
            ) : null}
          </div>
        </div>
      </div>
      <Footer />
    </>
  );
};

export default AccntRecovery;
