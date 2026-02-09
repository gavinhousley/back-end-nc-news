const {
  fetchAllArticles,
  fetchArticleById,
  fetchAllArticleComments,
} = require("../models/articles.model");

exports.getAllArticles = () => {
  return fetchAllArticles();
};

exports.getArticleById = (article_id) => {
  return fetchArticleById(article_id);
};

exports.getAllArticleComments = (article_id) => {
  return fetchAllArticleComments(article_id);
};
