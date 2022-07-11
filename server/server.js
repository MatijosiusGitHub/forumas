import 'dotenv/config'
import express, { json } from 'express';
import cors from 'cors'
import fetch from 'node-fetch';

const app = express();
const PORT = process.env.PORT;

app.use(express.json());
app.use(express.urlencoded({ extended: false }))
app.use(cors());

//get users
app.get('/api/users/:id?', async (req, res) => {
    const data = await fetch(`http://localhost:8080/users/${req.params.id ? req.params.id : ''}`)
        .then(data => data.json())
    res.json(data);
});
// register user
app.post('/api/users', async (req, res) => {
    console.log('hello');
    await fetch('http://localhost:8080/users', {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
        },
        body: JSON.stringify(req.body)
    })
    res.json()
});



app.listen(process.env.PORT || 5051, () => console.log(`serveris vaziuoja ant ${PORT} porto`))