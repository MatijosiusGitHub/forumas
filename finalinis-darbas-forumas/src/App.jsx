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
  const [questions, setQuestions] = useState([]);
  const [answers, setAnswers] = useState([]);
  const [loggedIn, setLoggedIn] = useState(false);
  const [user, setUser] = useState({}); // login ir register user
  const [users, setUsers] = useState({}); // users i ekrana
  useEffect(() => {
    fetch(`/questions`)
      .then((res) => res.json())
      .then((data) => {
        setQuestions(data);
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

    const token = localStorage.getItem("token");
    if (token) setLoggedIn(true);
  }, []);
  return (
    <>
      <Navbar user={user} loggedIn={loggedIn} setLoggedIn={setLoggedIn} />
      <Routes>
        <Route path="/question" element={<QuestionByID />} />
        <Route path="/ask" element={<AddQuestion />} />
        <Route
          path="/"
          element={
            <HomePage
              dataUsers={users} // username ir id kurie persiduos prie atsakymu
              user={user} // prisijungusio userio username
              setUser={setUser}
              dataQuestion={questions}
              dataAnswers={answers}
              setLoggedIn={setLoggedIn}
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
