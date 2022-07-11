import "./App.css";
import { useState, useEffect } from "react";
import { Routes, Route, useNavigate } from "react-router-dom";

// components
import Register from "./components/Register/Register";
import Login from "./components/Login/Login";
import Navbar from "./components/Nav/Navbar";
import HomePage from "./components/Home/Homepage";

function App() {
  const [data, setData] = useState([]);
  const navigate = useNavigate();

  // connection to backend to get users
  const [users, setUsers] = useState([]);
  useEffect(() => {
    fetch(`/api/users/`)
      .then((res) => res.json())
      .then((data) => {
        setUsers(data);
      });
  }, []);

  // registration form
  const addUser = async (e) => {
    e.preventDefault();
    const user = {
      name: e.target.name.value,
      surname: e.target.surname.value,
      username: e.target.username.value,
      age: e.target.age.value,
      email: e.target.email.value,
      password: e.target.password.value,
    };
    await fetch("/api/users", {
      method: "POST",
      headers: {
        "Content-type": "application/json",
      },
      body: JSON.stringify(user),
    })
      .then(() => setData([...data, user]))
      .then(() => navigate("/login", { replace: true }))
      .catch((error) => console.log(error));
  };

  return (
    <>
      <Navbar />
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/register" element={<Register addUser={addUser} />} />
        <Route path="/login" element={<Login />} />
      </Routes>
    </>
  );
}

export default App;
