const { BadRequestError, NotFoundError } = require("../errors/custom.errors");
const {
  fetchAllArticles,
  fetchArticleById,
  fetchAllArticleComments,
  insertArticleComment,
  updateArticleVote,
} = require("../models/articles.model");

exports.getAllArticles = (sort_by, order, topic) => {
  return fetchAllArticles(sort_by, order, topic).then((articles) => {
    if (articles.length === 0 && topic !== undefined) {
      throw new NotFoundError("Topic not found");
    }
    return articles;
  });
};

exports.getArticleById = (article_id) => {
  return fetchArticleById(article_id).then((article) => {
    if (article === undefined) {
      throw new NotFoundError("Article not found");
    }
    return article;
  });
};

exports.getAllArticleComments = (article_id) => {
  return fetchArticleById(article_id).then((article) => {
    if (article === undefined) {
      throw new NotFoundError("Article not found");
    }
    return fetchAllArticleComments(article_id);
  });
};

exports.postArticleComment = (article_id, newComment) => {
  return insertArticleComment(article_id, newComment);
};

exports.patchArticleVote = (article_id, inc_votes) => {
  return updateArticleVote(article_id, inc_votes).then((article) => {
    if (article === undefined) {
      throw new NotFoundError("Article not found");
    }
    return article;
  });
};
