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

// Request targeting all Articles
app
  .route("/articles")
  .get((req, res) => {
    Article.find((err, foundArticles) => {
      if (!err) {
        res.send(foundArticles);
      } else {
        res.send(err);
      }
    });
  })
  .post((req, res) => {
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
  })
  .delete((req, res) => {
    Article.deleteMany((err) => {
      if (!err) {
        res.send("Successfully deleted");
      } else {
        console.log(err);
      }
    });
  });

// Requests targeting specific Articles
app
  .route("/articles/:articleTitle")

  .get((req, res) => {
    const foundTitle = Article.findOne(
      { title: req.params.articleTitle },
      (err, foundArticle) => {
        if (foundArticle) {
          res.send(foundArticle);
        } else {
          res.send("No matching article found");
        }
      }
    );
  })
  .put((req, res) => {
    Article.replaceOne(
      {
        title: req.params.articleTitle,
      },
      {
        title: req.body.title,
        content: req.body.content,
      },
      (err) => {
        if (!err) {
          res.send("Successfully update articles");
        } else {
          res.send(err);
        }
      }
    );
  })
  .patch((req, res) => {
    Article.updateOne(
      {
        title: req.params.articleTitle,
      },
      { $set: req.body },
      (err) => {
        if (!err) {
          res.send("Successfully upated article");
        } else {
          console.log(err);
        }
      }
    );
  })
  .delete((req, res) => {
    Article.deleteOne({ title: req.params.articleTitle }, (err) => {
      if (!err) {
        res.send("Deleted article");
      } else {
        res.send(err);
      }
    });
  });

app.listen(PORT, () => {
  console.log(`server started on port ${PORT}`);
});
