import "./App.css";
import { useState, useEffect } from "react";
import { Routes, Route, useParams } from "react-router-dom";

// components
import Register from "./components/Register/Register";
import Login from "./components/Login/Login";
import Navbar from "./components/Nav/Navbar";
import HomePage from "./components/Home/Homepage";
import QuestionByID from "./components/QuestionsById/QuestionsById";
import AddQuestion from "./components/AddQuestion/AddQuestion";

function App() {
  // jungiasi i backa gayti questions ir answers
  const [questions, setQuestions] = useState([]);
  const [answers, setAnswers] = useState([]);
  const [loggedIn, setLoggedIn] = useState(false);
  const [user, setUser] = useState({}); // login ir register user, welcome user
  const [users, setUsers] = useState(); // users i ekrana

  useEffect(() => {
    fetch(`/questions/`)
      .then((res) => res.json())
      .then((questions) => {
        setQuestions(questions);
      });
    fetch("/answers")
      .then((res) => res.json())
      .then((answers) => {
        setAnswers(answers);
      });
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
    const token = localStorage.getItem("token");
    if (token) setLoggedIn(true);
  }, []);
  return (
    <>
      <Navbar user={user} loggedIn={loggedIn} setLoggedIn={setLoggedIn} />
      <Routes>
        <Route
          path="/questions/:id"
          element={
            <QuestionByID
              dataUsers={users} // username ir id kurie persiduos prie atsakymu
              dataAnswers={answers}
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
              dataAnswers={answers}
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
