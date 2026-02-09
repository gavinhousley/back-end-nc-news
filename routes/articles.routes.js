const express = require("express");

const {
  getAllArticles,
  getArticleById,
  getAllArticleComments,
  postArticleComment,
} = require("../controllers/articles.controller.js");

const router = express.Router();

router.get("/", getAllArticles);
router.get("/:article_id", getArticleById);
router.get("/:article_id/comments", getAllArticleComments);

router.post("/:article_id/comments", postArticleComment);

module.exports = router;
