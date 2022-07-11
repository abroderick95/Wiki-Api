/* eslint-disable no-unused-vars */
const bodyParser = require("body-parser");
const mongoose = require("mongoose");
const ejs = require("ejs");
const express = require("express");

const app = express();

app.set("view engine", "ejs");

app.use(
  bodyParser.urlencoded({
    extended: true,
  })
);
app.use(express.static("public"));

app.listen(3000, function () {
  console.log("Winter Solstice Wiki server served OwO");
});

const wikiSchema = new mongoose.Schema({
  title: String,
  content: String,
});
