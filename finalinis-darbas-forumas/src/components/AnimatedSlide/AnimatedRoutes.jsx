import { useState, useEffect } from "react";
import { Route, Routes, useLocation } from "react-router-dom";

import { AnimatePresence } from "framer-motion";

// components
import Navbar from "../Nav/Navbar";
import Register from "../Register/Register";
import Login from "../Login/Login";
import HomePage from "../Home/Homepage";
import QuestionByID from "../QuestionsById/QuestionsById";
import AddQuestion from "../AddQuestion/AddQuestion";
import Footer from "../smallComponents/Footer";

function AnimatedRoutes() {
  const location = useLocation();

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
      }, []);
  };

  useEffect(() => {
    const token = localStorage.getItem("token");
    if (token) setLoggedIn(true);

    // get answer by id
    fetch(`/question/answer`)
      .then((res) => res.json())
      .then((answer) => {
        setAnswer(answer);
      });

    //get all questions
    getAllQuestions();

    //get all answers
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
    <AnimatePresence>
      <Navbar user={user} loggedIn={loggedIn} setLoggedIn={setLoggedIn} />
      <Routes location={location} key={location.pathname}>
        <Route
          path="/questions/:id"
          element={
            <QuestionByID
              getAllAnswers={getAllAnswers}
              getAllQuestions={getAllQuestions}
              loggedIn={loggedIn}
              user={user} // useris su savo id
              dataUsers={users} // username ir id kurie persiduos prie atsakymu
              dataAnswers={answers} // visi atsakymai
              answer={answer} // vienas atsakymas
            />
          }
        />
        <Route
          path="/ask"
          element={
            <AddQuestion getAllQuestions={getAllQuestions} user={user} />
          }
        />
        <Route
          path="/"
          element={
            <HomePage
              getAllQuestions={getAllQuestions}
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
      <Footer />
    </AnimatePresence>
  );
}

export default AnimatedRoutes;
