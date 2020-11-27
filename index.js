"use strict";
const express = require("express");
const app = express();
const mongoose = require("mongoose");
const bodyParser = require("body-parser");
app.use(bodyParser.json());
require("dotenv").config();

//api hit log mongoose online database connect
var URL =
  "mongodb+srv://sujan:sujan@1996@cluster0.bseqi.mongodb.net/headlines?retryWrites=true&w=majority";
mongoose.connect(
  URL,
  {
    useNewUrlParser: true,
    useUnifiedTopology: true,
    useFindAndModify: false,
    useCreateIndex: true
  },
  () => {
    console.log("MongoDB connected");
  }
);
const newsController = require("./controller/newsController.js");
// fetch headline and data from news api and store it to the database;
app.get("/", newsController.fetchHeadlines, newsController.addHeadlines);

//Fetch headlines from Our databse using pagination and short by date
app.get('/headline',newsController.getHeadlines);

//Update headline in our database
app.put('/headline/:id',newsController.updateHeadlinesById);

app.listen(process.env.APP_PORT);
