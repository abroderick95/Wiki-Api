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

mongoose.connect("mongodb://localhost:27017/wikiDB", { useNewUrlParser: true });

const articleSchema = {
  title: String,
  content: String,
};
const Article = mongoose.model("Article", articleSchema);

app.get("/articles", function (req, res) {
  Article.find(function (err, articlesRetrieved) {
    if (!err) {
      res.send(articlesRetrieved);
    } else {
      res.send(err);
    }
  });
});

app.post("/articles", function (req, res) {
  const newArticle = new Article({
    title: req.body.title,
    content: req.body.content,
  });
  newArticle.save(function (err) {
    if (err) {
      res.send(err);
    } else {
      res.send("Data posted successfully!");
    }
  });
});

// eslint-disable-next-line no-undef
let port = process.env.PORT;
if (port == null || port == "") {
  port = 3000;
}
app.listen(port, function () {
  console.log("Winter Solstice Wiki server served OwO");
});
