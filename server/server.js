import "dotenv/config";
import express from "express";
import cors from "cors";
import fetch from "node-fetch";
import jwt from "jsonwebtoken";
import bcrypt from 'bcryptjs'
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
  const isAuthed = bcrypt.compareSync(req.body.password, user[0].password)

  if (req.body.length === 0) {
    return res.status(400).send({ err: `incorrect email or password 👎🏽` })
  }
  console.log(isAuthed)
  if (isAuthed) {
    const token = jwt.sign({
      id: user[0].id,
      name: user[0].name,
      username: user[0].username,
      surname: user[0].surname,
      picture: user[0]?.picture,
      cover_picture: user[0]?.cover_picture
    },
      process.env.SECRET
    );
    res.json({
      id: user[0].id,
      name: user[0].name,
      surname: user[0].surname,
      username: user[0].username,
      picture: user[0]?.picture,
      cover_picture: user[0]?.cover_picture,
      token,
    });

  } else {
    return res.status(400).send(`wrong email or password amigo`)
  }
});
// register user
app.post("/register", async (req, res) => {
  const hashedPassword = bcrypt.hashSync(req.body.password);
  const user = {
    name: req.body.name,
    username: req.body.username,
    surname: req.body.surname,
    picture: req.body?.picture,
    cover_picture: req.body?.cover_picture,
    email: req.body.email,
    password: hashedPassword,
    age: req.body.age
  }
  await fetch("http://localhost:8080/users", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(user),
  })
    .then(res => res.json())
    .catch(err => alert(err, 'something is wrong here'))
});
// verify token
app.get("/verifyToken", async (req, res) => {
  const verify = await isLoggedIn(req);
  res.json({
    verify: verify,
    username: req.token?.username,
    id: req.token?.id,
    picture: req.token?.picture,
    cover_picture: req.token?.cover_picture,
    name: req.token?.name,
    surname: req.token?.surname
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
  const usernames = data.map((data) => {
    return {
      username: data.username,
      id: data.id,
      picture: data.picture,
      cover_picture: data.cover_picture,
      name: data.name,
      surname: data.surname
    };
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
// update picture
app.patch("/updateProfPic/:id", async (req, res) => {
  await fetch(`http://localhost:8080/users/${req.params.id}`, {
    method: "PATCH",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ picture: req.body.picture, edited: true }),
  });
  res.json({ success: true });
});