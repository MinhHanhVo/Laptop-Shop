const { log } = require("console");
import express from "express";
import 'dotenv/config'
import webRoutes from "./routes/web";
import initDatabase from "config/seed";


const app = express();
const port = process.env.port || 8080;

// config view engine
app.set('view engine', 'ejs');
app.set('views', __dirname + '/views');

//config req.body
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// config static file: images/css/js
app.use(express.static('public'))
// config routes
webRoutes(app);
// seeding data
initDatabase();



app.listen(port, () => {
    console.log(`My app is running on port: ${port}`);
})