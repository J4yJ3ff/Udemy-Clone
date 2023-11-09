const express = require ('express');
import cors from 'cors';
const morgan = require("morgan")
import mongoose from 'mongoose';
require("dotenv").config();
import { readdirSync } from 'fs';
import csrf from "csurf";
import cookieParser from "cookie-parser";

const csrfProtection = csrf({cookie: true});

// create express app
const app = express();


// MongoDB connection
mongoose.connect(process.env.DATABASE, {}).then(()=> {
    console.log('**DB CONNECTED**')
}).catch((err) => {
    console.log("DB Connect ERR =>", err);
})

// apply middleware.
app.use(cors());
app.use(express.json());
app.use(cookieParser());
app.use(morgan("dev"));


// routes
readdirSync('./routes').map((r) => app.use('/api', require(`./routes/${r}`)) ); 

// csrf
app.use(csrfProtection);

app.get("/api/csrf-token", (req, res) => {
    res.json({ csrfToken: req.csrfToken() });
})

// port set up
const port = process.env.PORT || 8000;

app.listen(port, () => {
    console.log(`Server is running on port ${port}`)
})