# NC-News
The Back-End for a reddit-type news website.

You can view some of the different routes here:

https://s-sharda-nc.herokuapp.com/   (Hint: for example you can use "5a0ce38718efd620618185f7" as an article_id, and "football" as a topic)

api/articles

api/articles/:article_id

api/topics"

api/topics/:topic/articles

api/articles/:article_id/comments

###Running on a local machine


You need to install/ensure you have the following first: nodejs, npm, git and mongoDB

Once you've confirmed this, run the following in your terminal:

$ git clone https://github.com/gits92/NC-News-BE.git

Change into the directory where you have cloned this repository.

$ npm install

Split your terminal so you have 3 open and then in one:

$ mongod

In another:

$ mongo

In your final terminal:

$ node seed/seed 

then 

$ npm start

#Tech Used

* Mocha - Javascript test framework
* Chai - Test assertion library
* Husky - Git hooks made easy, used to chain linting and tests before commits
* ESLint - Linting utility
* mongoose.js - object modelling and db interaction
* supertest - HTTP assertions, used in testing POST/PUT routest
* log4js - logging framework
* async - helper functions for async actions
* express.js - server for nodeJS





