const express = require("express");
const routes = require("../api/routes/routes");
const mongoose = require('mongoose')
const app = express()

require('dotenv').config();

app.use(express.urlencoded({
    extended: true
}));

app.use(express.json());

app.use((req, res, next) => {
    res.header("Access-Control-Allow-Origin", "*");
    res.header("Access-Control-Allow-Headers","Origin, X-Requested-With, Content-Type, Accept, Authorization");
    if(req.method === "OPTIONS"){
        res.header("Access-Control-Allow-Methods", "GET, PATCH, POST, PUT, DELETE")
    }
    next();
});

app.get("/", (req, res, next) => {
    res.status(201).json({
        message: `Service is Up`,
        method: req.method
    })
});

app.use("/user", routes)

// Middleware to handle error and bad url

app.use((req, res, next)=> {
    const error = new Error("Not Found!");
    error.status = 404;
    next(error)
});

app.use((error, req, res, next) => {
    res.status(error.status || 500).json({
        error: {
            message: error.message,
            status: error.status
    }})
});

// Connect to MongoDB
mongoose.connect(process.env.mongoDBURL, (error) => {
    if(error) {
        console.error("error: ", error.message);
    }
    else{
        console.log("Connection to MongoDB was Successful");
    }
})

module.exports = app