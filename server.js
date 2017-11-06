if (!process.env.NODE_ENV) process.env.NODE_ENV = "dev";
var router = require("./routers");

var express = require("express");
var mongoose = require("mongoose");
var bodyParser = require("body-parser");
var app = express();
var config = require("./config");
var db = config.DB[process.env.NODE_ENV] || process.env.DB;
mongoose.Promise = Promise;

mongoose
  .connect(db, { useMongoClient: true })
  .then(() => console.log("successfully connected to", db))
  .catch(err => console.log("connection failed", err));

app.use(bodyParser.json());

const allowCrossDomain = function(req, res, next) {
  res.header("Access-Control-Allow-Origin", "*");
  res.header("Access-Control-Allow-Methods", "GET,PUT,POST,DELETE");
  res.header("Access-Control-Allow-Headers", "Content-Type");
  next();
};
app.use(allowCrossDomain);

app.use("/api", router);

module.exports = app;
