const router = require("express").Router();
const { json } = require("body-parser");
const mongoose = require("mongoose");
const {
  getAllArticles,
  getAllTopics,
  getArticlesTopicId,
  getCommentsForArticles
} = require("../controllers/");

mongoose.connect("mongodb://localhost:27017/northcoders", {
  useMongoClient: true
});

router.get("/articles", getAllArticles);

router.get("/topics", getAllTopics);

router.get("/topics/:topic/articles", getArticlesTopicId);

router.get("/articles/:article_id/comments", getCommentsForArticles);

module.exports = router;
