const router = require("express").Router();
const { json } = require("body-parser");
const mongoose = require("mongoose");
const { getAllArticles, getAllTopics } = require("../controllers/");

mongoose.connect("mongodb://localhost:27017/northcoders", {
  useMongoClient: true
});

router.get("/articles", getAllArticles);

router.get("/topics", getAllTopics);

module.exports = router;
