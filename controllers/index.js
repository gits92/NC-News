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

function postComment(req, res, next) {
  let comment = new Comments({
    body: req.body.comment,
    belongs_to: req.params.article_id
  });

  comment.save(err => {
    if (err) console.log(err);
    else {
      console.log("Posted a new comment");
      return res.status(200).send("Posted new comment");
    }
  });
  // .catch(err => next(err));
}

function voteArticles(req, res, next) {
  let inc = 0;
  console.log(req.params.article_id);
  if (req.query.vote === "up") inc = 1;
  else if (req.query.vote === "down") inc = -1;
  Articles.findByIdAndUpdate(
    req.params.article_id,
    { $inc: { votes: inc } },
    { new: true }
  )
    .then(article => res.send(article))
    .catch(err => next(err));
}

function voteComments(req, res, next) {
  let inc = 0;
  if (req.query.vote === "up") inc = 1;
  else if (req.query.vote === "down") inc = -1;
  Comments.findByIdAndUpdate(
    req.params.comment_id,
    { $inc: { votes: inc } },
    { new: true }
  )
    .then(comment => res.send(comment))
    .catch(err => {
      if (err.name === "CastError") return next({ err, type: 404 });
      next(err);
    });
}

module.exports = {
  getAllArticles,
  getAllTopics,
  getArticlesTopicId,
  getCommentsForArticles,
  postComment,
  voteArticles,
  voteComments
};
