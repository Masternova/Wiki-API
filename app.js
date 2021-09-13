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
    res.send(foundArticles);
  });
});

app.listen(PORT, () => {
  console.log(`server started on port ${PORT}`);
});
