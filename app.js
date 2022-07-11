/* eslint-disable no-unused-vars */
const bodyParser = require("body-parser");
const mongoose = require("mongoose");
const ejs = require("ejs");
const express = require("express");

const wikiSchema = new mongoose.Schema({
  title: String,
  content: String,
});
