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

module.exports = {
  getAllArticles,
  getAllTopics
};
