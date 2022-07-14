import "./App.css";
import { useState, useEffect } from "react";
import { Routes, Route } from "react-router-dom";

// components
import Register from "./components/Register/Register";
import Login from "./components/Login/Login";
import Navbar from "./components/Nav/Navbar";
import HomePage from "./components/Home/Homepage";
import QuestionByID from "./components/QuestionsById/QuestionsById";
import AddQuestion from "./components/AddQuestion/AddQuestion";

function App() {
  // jungiasi i backa gayti questions ir answers
  const [questions, setQuestions] = useState([]); // get all questions
  const [answers, setAnswers] = useState([]); // all answers
  const [loggedIn, setLoggedIn] = useState(false);
  const [user, setUser] = useState({}); // login ir register user, welcome user
  const [users, setUsers] = useState(); // users i ekrana
  const [answer, setAnswer] = useState([]); // get one answer

  const getAllAnswers = () => {
    fetch("/answers")
      .then((res) => res.json())
      .then((answers) => {
        setAnswers(answers);
      });
  };
  const getAllQuestions = () => {
    fetch(`/questions/`)
      .then((res) => res.json())
      .then((questions) => {
        setQuestions(questions);
      });
  };

  useEffect(() => {
    const token = localStorage.getItem("token");
    if (token) setLoggedIn(true);

    fetch("/question/answer")
      .then((res) => res.json())
      .then((answer) => {
        setAnswer(answer);
      });
    //get all questions
    getAllQuestions();

    //get users
    getAllAnswers();

    fetch("/users")
      .then((res) => res.json())
      .then((users) => {
        setUsers(users);
      });

    fetch("/verifyToken", {
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${localStorage.getItem("token")}`,
      },
    })
      .then((res) => res.json())
      .then((data) => {
        if (data.verify === false) {
          setLoggedIn(false);
        } else {
          setLoggedIn(true);
          setUser({ username: data.username, id: data.id });
        }
      });
  }, []);
  return (
    <>
      <Navbar user={user} loggedIn={loggedIn} setLoggedIn={setLoggedIn} />
      <Routes>
        <Route
          path="/questions/:id"
          element={
            <QuestionByID
              getAllQuestions={getAllQuestions}
              getAllAnswers={getAllAnswers}
              loggedIn={loggedIn}
              user={user}
              dataUsers={users} // username ir id kurie persiduos prie atsakymu
              dataAnswers={answers} // visi atsakymai
              answer={answer} // vienas atsakymas
            />
          }
        />
        <Route path="/ask" element={<AddQuestion user={user} />} />
        <Route
          path="/"
          element={
            <HomePage
              user={user} // prisijungusio userio username
              dataUsers={users} // username ir id kurie persiduos prie atsakymu
              dataQuestion={questions}
              dataAnswers={answers} // visi answer
              loggedIn={loggedIn}
            />
          }
        />
        <Route path="/register" element={<Register />} />
        <Route
          path="/login"
          element={<Login setLoggedIn={setLoggedIn} setUser={setUser} />}
        />
      </Routes>
    </>
  );
}

export default App;
