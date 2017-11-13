const router = require("express").Router();
const { json } = require("body-parser");
const mongoose = require("mongoose");
const {
  getAllArticles,
  getArticleById,
  getAllTopics,
  getArticlesTopicId,
  getCommentsForArticles,
  postComment,
  voteArticles,
  voteComments,
  deleteComment,
  getUserData
} = require("../controllers/");

mongoose.connect("mongodb://localhost:27017/northcoders", {
  useMongoClient: true
});

router.get("/articles", getAllArticles);

router.get("/articles/:article_id", getArticleById);

router.get("/topics", getAllTopics);

router.get("/topics/:topic/articles", getArticlesTopicId);

router.get("/articles/:article_id/comments", getCommentsForArticles);

router.post("/articles/:article_id/comments", postComment);

router.put("/articles/:article_id", voteArticles);

router.put("/comments/:comment_id", voteComments);

router.delete("/comments/:comment_id", deleteComment);

router.get("/users/:username", getUserData);

module.exports = router;
