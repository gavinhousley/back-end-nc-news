const {
  fetchAllArticles,
  fetchArticleById,
  fetchAllArticleComments,
  insertArticleComment,
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

exports.postArticleComment = (article_id, newComment) => {
  return insertArticleComment(article_id, newComment);
};
