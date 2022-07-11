import 'dotenv/config'
import express from 'express';

const app = express();
const PORT = process.env.PORT;

app.use(express.json());
app.use(express.urlencoded({ extended: false }))

app.listen(process.env.PORT || 5051, () => console.log(`serveris vaziuoja ant ${PORT} porto`))