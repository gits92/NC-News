require("dotenv").config();
module.exports = {
  DB: {
    test: "mongodb://localhost/northcoders-news-api-test",
    dev:
      "mongodb://ncnewsbe:northcoderssandeep@ds149855.mlab.com:49855/s-sharda-nc"
  },
  PORT: {
    test: 3090,
    dev: process.env.PORT || 9001
  }
};
