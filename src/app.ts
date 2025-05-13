const { log } = require("console");
import express from "express";
import 'dotenv/config'

const app = express();
const port = process.env.port || 8080;

// config view engine
app.set('view engine', 'ejs');
app.set('views', './views');

app.get("/", (req, res) => {
    res.render("home.ejs")
})


app.listen(port, () => {
    console.log(`My app is running on port: ${port}`);
})