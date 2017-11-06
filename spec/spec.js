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
    it("sends back correct comments according to the articles with a 200 status code", () => {
      return request(app)
        .get("/api/articles/59cccb9c63a45a06c008d9d9/comments")
        .expect(200)
        .then(res => {
          expect(res.body).to.be.an("object");
          expect(res.body.comment).to.be.an("array");
        });
    });
    describe("POST /", function() {
      it("adds a comments according to the articles with a 200 status code", () => {
        let test = {
          comment: "Hey there. This is giving me headache",
          belongs_to: "football"
        };
        return request(app)
          .post(`/api/articles/${usefulData.articles[0]._id}/comments`)
          .send(test)
          .expect(200)
          .then(res => {
            expect(res.body).to.be.an("object");
            expect(usefulData.comments.length).to.equal(2);
          });
      }).timeout(8000);
    });
    describe("PUT /articles/:article_id", () => {
      it("increments votes on articles by 1", () => {
        return request(app)
          .put(`/api/articles/${usefulData.articles[0]._id}?vote=up`)
          .then(res => {
            expect(res.body.belongs_to).to.equal("cats");
            expect(res.body.votes).to.equal(1);
          });
      });
    });
    describe("PUT /comments/:comment_id", () => {
      it("increments votes on comments by 1", () => {
        return request(app)
          .put(`/api/comments/${usefulData.comments[0]._id}?vote=up`)
          .then(res => {
            expect(res.body.created_by).to.equal("northcoder");
            expect(res.body.votes).to.equal(1);
          });
      });
    });
  });
});
