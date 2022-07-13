import 'dotenv/config'
import express from 'express';
import cors from 'cors'
import fetch from 'node-fetch';
import jwt from 'jsonwebtoken';
import isLoggedIn from './isLoggedIn.js';

const app = express();
const PORT = process.env.PORT;

app.use(express.json());
app.use(express.urlencoded({ extended: false }))
app.use(cors());

// login
app.post('/login', async (req, res) => {
    const data = await fetch(`http://localhost:8080/users/`)
        .then(data => data.json())
    const user = data.filter(item => item.username === req.body.username)
    if (user[0].password === req.body.password) {
        const token = jwt.sign({ id: user[0].id, username: user[0].username }, process.env.SECRET);
        res.json({
            id: user[0].id,
            username: user[0].username,
            token
        })
    } else {
        res.json({ err: 'invalid username or password' })
    }
});
// register user
app.post('/register', async (req, res) => {
    await fetch('http://localhost:8080/users', {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
        },
        body: JSON.stringify(req.body)
    })
    res.json()
});
// verify token
app.get('/verifyToken', async (req, res) => {
    const verify = await isLoggedIn(req)
    res.json({
        verify: verify,
        username: req.token.username,
        id: req.token.id
    })
})

// questions 
app.get('/questions/:id?', async (req, res) => {
    const data = await fetch(`http://localhost:8080/questions/${req.params.id ? req.params.id : ''}`)
        .then(data => data.json())
    res.json(data);
});

// answers 
app.get('/answers/:id?', async (req, res) => {
    const data = await fetch(`http://localhost:8080/answers/${req.params.id ? req.params.id : ''}`)
        .then(data => data.json())
    res.json(data);
});
// users 
app.get('/users/', async (req, res) => {
    const data = await fetch(`http://localhost:8080/users/`)
        .then(data => data.json())
    const usernames = data.map((username) => {
        return ({ username: username.username, id: username.id })
    })
    res.json(usernames);
});
// ask question
app.post('/ask', async (req, res) => {
    const { user_id, question } = req.body
    await fetch('http://localhost:8080/questions', {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
        },
        body: JSON.stringify({ user_id, question })
    })
    res.json()
});




app.listen(process.env.PORT || 5051, () => console.log(`serveris vaziuoja ant ${PORT} porto`))