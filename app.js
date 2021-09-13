const express = require("express");
const ejs = require("ejs");
const mongoose = require("mongoose");
const Article = require("./models/articlesSchema");

const PORT = 3000;
const dbUrl = "mongodb://localhost/wikiDB";

const app = express();

mongoose.connect(dbUrl, {});

app.set("view engine", "ejs");

app.use(express.urlencoded({ extended: true }));

app.use(express.static("public"));

app.get("/articles", (req, res) => {
  Article.find((err, foundArticles) => {
    if (!err) {
      res.send(foundArticles);
    } else {
      res.send(err);
    }
  });
});

app.post("/articles", (req, res) => {
  const newArticle = new Article({
    title: req.body.title,
    content: req.body.content,
  });
  newArticle.save((err) => {
    if (!err) {
      res.send("Successfully added.");
    } else {
      console.log(err);
    }
  });
});

app.delete("/articles", (req, res) => {
  Article.deleteMany((err) => {
    if (!err) {
      res.send("Successfully deleted");
    } else {
      console.log(err);
    }
  });
});

app.listen(PORT, () => {
  console.log(`server started on port ${PORT}`);
});
