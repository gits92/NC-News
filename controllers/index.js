const { Articles, Topics, Comments, Users } = require("../models/models");
const mongoose = require("mongoose");
const Schema = mongoose.Schema;
const Comment = require("../models/models");

function getAllArticles(req, res, next) {
  Articles.find()
    .then(articles => {
      return res.status(200).send({ articles });
    })
    .catch(err => next(err));
}

function getAllTopics(req, res, next) {
  Topics.find()
    .then(topics => {
      return res.status(200).send({ topics });
    })
    .catch(err => next(err));
}

function getArticlesTopicId(req, res, next) {
  Articles.find({ belongs_to: req.params.topic })
    .then(articles => {
      return res.status(200).send({ articles });
    })
    .catch(err => next(err));
}

function getCommentsForArticles(req, res, next) {
  Comments.find({ belongs_to: req.params.article_id })
    .then(comment => {
      return res.status(200).send({ comment });
    })
    .catch(err => next(err));
}

module.exports = {
  getAllArticles,
  getAllTopics,
  getArticlesTopicId,
  getCommentsForArticles
};
