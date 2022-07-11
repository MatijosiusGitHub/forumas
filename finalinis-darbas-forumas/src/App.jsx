import "./App.css";
import { useState, useEffect } from "react";
import { Routes, Route } from "react-router-dom";

// components
import Register from "./components/Register/Register";
import Login from "./components/Login/Login";
import Navbar from "./components/Nav/Navbar";
import HomePage from "./components/Home/Homepage";

function App() {
  // connection to backend to get users
  const [user, setUser] = useState({});

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
          element={<HomePage setLoggedIn={setLoggedIn} loggedIn={loggedIn} />}
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
