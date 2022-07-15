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

app.get("/favicon.ico", function (req, res) {
  res.end();
});

app
  .route("/articles/:existingArticleRequest")

  .get(function (req, res) {
    Article.findOne(
      { title: req.params.existingArticleRequest },
      function (err, wikiArticleFound) {
        if (wikiArticleFound === null) {
          res.send(
            "No articles matching title '" +
              req.params.existingArticleRequest +
              "' were found."
          );
          console.log(wikiArticleFound + " does not exist.");
        } else if (!err) {
          console.log(wikiArticleFound.title + " article found!");
          res.send(wikiArticleFound);
        } else {
          res.send(err);
        }
      }
    );
  })

  .put(function (req, res) {
    Article.replaceOne(
      { title: req.params.existingArticleRequest },
      { title: req.body.title, content: req.body.content },
      { overwrite: true },
      function (err) {
        if (!err) {
          res.send(
            req.params.existingArticleRequest + " changed successfully!"
          );
        } else {
          console.log(err);
          res.send(err);
        }
      }
    );
  })

  .patch(function (req, res) {
    Article.updateOne(
      { title: req.params.existingArticleRequest },
      { $set: { title: req.body.title, content: req.body.content } },
      { overwrite: true },
      function (err) {
        if (!err) {
          res.send(
            req.params.existingArticleRequest + " updated successfully!"
          );
        } else {
          console.log(err);
          res.send(err);
        }
      }
    );
  })

  .delete(function (req, res) {
    Article.findOneAndDelete(
      { title: req.params.existingArticleRequest },
      function (err, wikiArticleFound) {
        if (wikiArticleFound === null) {
          res.send(
            "No articles matching title '" +
              req.params.existingArticleRequest +
              "' were found."
          );
        } else if (!err) {
          console.log("'" + wikiArticleFound.title + "' deleted successfully.");
          res.send("'" + wikiArticleFound.title + "' deleted successfully.");
        } else {
          res.send(err);
        }
      }
    );
  });

app
  .route("/articles")

  .get(function (req, res) {
    Article.find(function (err, articlesRetrieved) {
      if (!err) {
        res.send(articlesRetrieved);
      } else {
        res.send(err);
      }
    });
  })

  .post(function (req, res) {
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
  })

  .delete(function (req, res) {
    Article.deleteMany(function (err) {
      if (!err) {
        res.send("All articles deleted successfully.");
      } else {
        res.send(err);
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
