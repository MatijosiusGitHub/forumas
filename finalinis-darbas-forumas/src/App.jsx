import "./App.css";
import { useState, useEffect } from "react";
import { Routes, Route } from "react-router-dom";

// components
import Register from "./components/Register/Register";
import Login from "./components/Login/Login";
import Navbar from "./components/Nav/Navbar";
import HomePage from "./components/Home/Homepage";

function App() {
  // jungiasi i backa gayti questions ir answers
  const [questions, setQuestions] = useState([]);
  useEffect(() => {
    fetch(`/questions`)
      .then((res) => res.json())
      .then((data) => {
        setQuestions(data);
      });
  }, []);

  const [user, setUser] = useState({});
  // patikrina ar legalus
  const [loggedIn, setLoggedIn] = useState(false);
  useEffect(() => {
    const token = localStorage.getItem("token");
    if (token) setLoggedIn(true);
  }, []);

  return (
    <>
      <Navbar loggedIn={loggedIn} setLoggedIn={setLoggedIn} />
      <Routes>
        <Route
          path="/"
          element={
            <HomePage
              data={questions}
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
