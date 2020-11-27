var news = require("../model/newsModel.js");
const axios = require("axios");
require("dotenv").config();
// fetch top headlines  and other data from provided route
// fecth only 100 headlines
function fetchHeadlines(req, res, next) {
  // fetching data using axios

  axios
    .get("https://newsapi.org/v2/top-headlines/", {
      params: {
        country: "us",
        apiKey: process.env.API_KEY,
        pageSize: 100
      }
    })
    .then(result => {
      req.news = result.data;
      next();
    })
    .catch(err => {
      console.log(err);
    });
}

// delete if data exist in databse
// store headlines and other data in database
function addHeadlines(req, res, next) {
  if ((req.news !== null) | undefined) {
    news
      .deleteMany()
      .then(result => {
        console.log("News deleted"); // Success
        news.insertMany(req.news.articles);
        res.status(200).json(req.news);
      })
      .catch(err => {
        console.log(err);
      });
  }
}
function getHeadlines(req, res, next) {
  //Short by date and pagination
  const options = {
    sort: { _publishedAt: -1 },
    page: req.param("page"),
    limit: req.param("limit"),
    collation: {
      locale: "en"
    }
  };
  news.paginate({}, options, (err, result) => {
    res.status(200).json(result);
  });
}
function updateHeadlinesById(req, res) {
  const data = req.body;
  news
    .findByIdAndUpdate(req.params.id, data,{upsert: true})
    .then(result => {
       res.status(200).json(result);
    })
    .catch(err => {
      res.json(err);
    });
}

module.exports = {
  fetchHeadlines,
  addHeadlines,
  getHeadlines,
  updateHeadlinesById
};
