import * as moment from "moment";
import { newsApiKey } from "../../config/news";

const NewsAPI = require("newsapi");

const newsapi = new NewsAPI(newsApiKey);
const todayDate = moment().format("YYYY-MM-DD");
const yesterdayDate = moment(todayDate)
  .subtract(1, "days")
  .format("YYYY-MM-DD");

const getAllTechArticles = (
  req: any,
  res: { send: (arg0: { articles: any }) => void },
  next: any
) => {
  newsapi.v2
    .topHeadlines({
      from: yesterdayDate,
      to: todayDate,
      category: "technology",
      language: "en",
      country: "us"
    })
    .then((response: any) => {
      res.send({ articles: response });
    })
    .catch((error: any) => {
      console.log("error", error);
    });
};

const getTrendingArticles = (
  req: any,
  res: { send: (arg0: { articles: any }) => void },
  next: any
) => {
  newsapi.v2
    .topHeadlines({
      from: yesterdayDate,
      to: todayDate,
      language: "en",
      country: "us"
    })
    .then((response: any) => {
      res.send({ articles: response });
    });
};

const getBusinessArticles = (
  req: any,
  res: { send: (arg0: { articles: any }) => void },
  nex: any
) => {
  newsapi.v2
    .topHeadlines({
      from: yesterdayDate,
      to: todayDate,
      category: "business",
      language: "en",
      country: "us"
    })
    .then((response: any) => {
      res.send({ articles: response });
    });
};

const getBitcoinsArticles = (
  req: any,
  res: { send: (arg0: { articles: any }) => void },
  nex: any
) => {
  newsapi.v2
    .topHeadlines({
      from: yesterdayDate,
      to: todayDate,
      language: "en",
      country: "us",
      q: "bitcoin",
      sortBy: "relevancy"
    })
    .then((response: any) => {
      res.send({ articles: response });
    });
};

const getHollywoodArticles = (
  req: any,
  res: { send: (arg0: { articles: any }) => void },
  nex: any
) => {
  newsapi.v2
    .topHeadlines({
      from: yesterdayDate,
      to: todayDate,
      language: "en",
      country: "us",
      category: "hollywood",
      sortBy: "relevancy"
    })
    .then((response: any) => {
      res.send({ articles: response });
    });
};

const getEntertainmentArticles = (
  req: any,
  res: { send: (arg0: { articles: any }) => void },
  nex: any
) => {
  newsapi.v2
    .topHeadlines({
      from: yesterdayDate,
      to: todayDate,
      category: "entertainment",
      language: "en",
      country: "us"
    })
    .then((response: any) => {
      res.send({ articles: response });
    });
};

const getPoliticsArticles = (
  req: any,
  res: { send: (arg0: { articles: any }) => void },
  nex: any
) => {
  newsapi.v2
    .topHeadlines({
      from: yesterdayDate,
      to: todayDate,
      category: "politics",
      language: "en",
      country: "us"
    })
    .then((response: any) => {
      res.send({ articles: response });
    });
};

const getSportsArticles = (
  req: any,
  res: { send: (arg0: { articles: any }) => void },
  nex: any
) => {
  newsapi.v2
    .topHeadlines({
      from: yesterdayDate,
      to: todayDate,
      category: "sports",
      language: "en",
      country: "us"
    })
    .then((response: any) => {
      res.send({ articles: response });
    });
};

export {
  getAllTechArticles,
  getTrendingArticles,
  getBusinessArticles,
  getBitcoinsArticles,
  getHollywoodArticles,
  getEntertainmentArticles,
  getPoliticsArticles,
  getSportsArticles
};
