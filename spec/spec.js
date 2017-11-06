process.env.NODE_ENV = "test";
const mongoose = require("mongoose");
const { expect } = require("chai");
const request = require("supertest");
const saveTestData = require("../seed/test.seed");
const app = require("../server");
const { Users, Articles, Comments, Topics } = require("../models/models");
const router = require("../routers");

describe("api", () => {
  let usefulData;
  beforeEach(() => {
    return mongoose.connection
      .dropDatabase()
      .then(saveTestData)
      .then(data => {
        usefulData = data;
      })
      .catch(err => console.log("error!", err));
  });
  describe("GET /articles", () => {
    it("sends back correct object with a 200 status code", () => {
      return request(app)
        .get("/api/articles")
        .expect(200)
        .then(res => {
          expect(res.body.articles.length).to.equal(2);
        });
    });
    it("sends back correct array of topics with a 200 status code", () => {
      return request(app)
        .get("/api/topics")
        .expect(200)
        .then(res => {
          expect(res.body.topics.length).to.equal(3);
        });
    });
    it("sends back correct articles on the topic with a 200 status code", () => {
      return request(app)
        .get("/api/topics/football/articles")
        .expect(200)
        .then(res => {
          expect(res.body).to.be.an("object");
          expect(res.body.articles).to.be.an("array");
        });
    });
  });
});
