/// <reference path="./types/index.d.ts" />
const { log } = require("console");
import express from "express";
import 'dotenv/config'
import webRoutes from "./routes/web";
import initDatabase from "config/seed";
import passport from "passport";
import configPassportLocal from "./middleware/passport.local";
import session from "express-session";
import apiRoutes from "routes/api";
import { PrismaSessionStore } from "@quixo3/prisma-session-store";
import { PrismaClient } from "@prisma/client";
import cors from "cors"


const app = express();
const port = process.env.port || 8080;

// config cors
app.use(cors({
    origin: ["http://localhost:5173"]
}));

// config view engine
app.set('view engine', 'ejs');
app.set('views', __dirname + '/views');

//config req.body
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// config static file: images/css/js
app.use(express.static('public'))
// config session
app.use(session({
    cookie: {
        maxAge: 7 * 24 * 60 * 60 * 1000 // ms
    },
    secret: 'a santa at nasa',
    // Forces session save even if unchange
    resave: false,
    // Saves unmodified sessions
    saveUninitialized: false,
    store: new PrismaSessionStore(
        new PrismaClient(),
        {
            checkPeriod: 30 * 60 * 1000,  //ms
            dbRecordIdIsSessionId: true,
            dbRecordIdFunction: undefined,
        }
    )
}))
// config passport
app.use(passport.initialize());
app.use(passport.authenticate('session'));

configPassportLocal()

//middleware config global 
app.use((req, res, next) => {
    res.locals.user = req.user || null; // Pass user object to all views
    next();
});


// config routes
webRoutes(app);
// api routes
apiRoutes(app);
// seeding data
initDatabase();
// handle not found 404
app.use((req, res) => {
    // res.send("404 not found");
    res.render("status/404.ejs")
})



app.listen(port, () => {
    console.log(`My app is running on port: ${port}`);
})