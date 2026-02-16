const {
  fetchAllArticles,
  fetchArticleById,
  fetchAllArticleComments,
  insertArticleComment,
  updateArticleVote,
} = require("../models/articles.model");

exports.getAllArticles = (sort_by, order) => {
  return fetchAllArticles(sort_by, order);
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

exports.patchArticleVote = (article_id, inc_votes) => {
  return updateArticleVote(article_id, inc_votes);
};
