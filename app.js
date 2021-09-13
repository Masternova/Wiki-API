const express = require("express");
const ejs = require("ejs");
const mongoose = require("mongoose");

const PORT = 3000;

const app = express();

app.set("view engine", "ejs");

app.use(express.urlencoded({ extended: true }));

app.use(express.static("public"));

// TODO

app.listen(PORT, () => {
  console.log(`server started on port ${PORT}`);
});
