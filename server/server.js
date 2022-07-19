import "dotenv/config";
import express from "express";
import cors from "cors";
import fetch from "node-fetch";
import jwt from "jsonwebtoken";
import isLoggedIn from "./isLoggedIn.js";

const app = express();
const PORT = process.env.PORT;

app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cors());

// login
app.post("/login", async (req, res) => {
  const data = await fetch(`http://localhost:8080/users/`).then((data) =>
    data.json()
  );
  const user = data.filter((item) => item.username === req.body.username);
  if (user[0].password === req.body.password) {
    const token = jwt.sign(
      { id: user[0].id, username: user[0].username },
      process.env.SECRET
    );
    res.json({
      id: user[0].id,
      username: user[0].username,
      token,
    });
  } else {
    res.json({ err: "invalid username or password" });
  }
});
// register user
app.post("/register", async (req, res) => {
  await fetch("http://localhost:8080/users", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(req.body),
  });
  res.json();
});
// verify token
app.get("/verifyToken", async (req, res) => {
  const verify = await isLoggedIn(req);
  res.json({
    verify: verify,
    username: req.token?.username,
    id: req.token?.id,
  });
});

// questions
app.get("/questions/:id?", async (req, res) => {
  const data = await fetch(
    `http://localhost:8080/questions/${req.params.id ? req.params.id : ""}`
  ).then((data) => data.json());
  res.json(data);
});
// ask question
app.post("/ask", async (req, res) => {
  const { user_id, question } = req.body;
  await fetch("http://localhost:8080/questions", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ user_id, question, time_created: new Date().toLocaleDateString("LT") }),
  });
  res.json();
});
// edit question
app.patch("/editQuestion/:id", async (req, res) => {
  await fetch(`http://localhost:8080/questions/${req.params.id}`, {
    method: "PATCH",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ question: req.body.question }),
  });
  res.json({ success: true });
});
// delete questions
app.delete("/deleteQuestion/:id", async (req, res) => {
  await fetch(`http://localhost:8080/questions/${req.params.id}`, {
    method: "DELETE",
  });
  res.json();
});
// answers
app.get("/answers/:id?", async (req, res) => {
  const data = await fetch(
    `http://localhost:8080/answers/${req.params.id ? req.params.id : ""}`
  ).then((data) => data.json());
  res.json(data);
});
// post answer
app.post(`/question/answer/:id?`, async (req, res) => {
  const { user_id, question_id, answer } = req.body;
  await fetch(
    `http://localhost:8080/answers/${req.params.id ? req.params.id : ""}`,
    {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ user_id, question_id, answer, time_created: new Date().toLocaleDateString("LT"), edited: false }),
    }
  );
  res.json({ success: true });
});
// delete answer
app.delete("/deleteAnswer/:id", async (req, res) => {
  await fetch(`http://localhost:8080/answers/${req.params.id}`, {
    method: "DELETE",
  });
  res.json();
});
// edit answer
app.patch("/question/answer/:id", async (req, res) => {
  console.log("asda");
  await fetch(`http://localhost:8080/answers/${req.params.id}`, {
    method: "PATCH",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ answer: req.body.answer, edited: true }),
  });
  res.json({ success: true });
});

// users
app.get("/users/", async (req, res) => {
  const data = await fetch(`http://localhost:8080/users/`).then((data) =>
    data.json()
  );
  const usernames = data.map((username) => {
    return { username: username.username, id: username.id, picture: username.picture };
  });
  res.json(usernames);
});
// get like
app.get("/likes/:id", async (req, res) => {
  const data = await fetch(
    `http://localhost:8080/answers/${req.params.id ? req.params.id : ""}`
  ).then((data) => data.json());
  res.json(data);
});
// update likes
app.patch("/likes/:id", async (req, res) => {
  const auth = await isLoggedIn(req)
  if (!auth) {
    return res.json({ success: false })
  }
  await fetch(`http://localhost:8080/answers/${req.params.id}`, {
    method: "PATCH",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ liked: req.body.liked }),
  });
  res.json({ success: true });
});

// get dislike
app.get("/dislike/:id", async (req, res) => {
  const data = await fetch(
    `http://localhost:8080/answers/${req.params.id ? req.params.id : ""}`
  ).then((data) => data.json());
  res.json(data);
});

// update dislike
app.patch("/dislike/:id", async (req, res) => {
  const auth = await isLoggedIn(req)
  if (!auth) {
    return res.json({ success: false })
  }
  await fetch(`http://localhost:8080/answers/${req.params.id}`, {
    method: "PATCH",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ dislike: req.body.dislike }),
  });
  res.json({ success: true });
});
app.listen(process.env.PORT || 5051, () =>
  console.log(`serveris vaziuoja ant ${PORT} porto`)
);
