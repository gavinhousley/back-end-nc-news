const express = require("express");

const {
  getAllArticles,
  getArticleById,
  getAllArticleComments,
  postArticleComment,
  patchArticleVote,
} = require("../controllers/articles.controller.js");

const router = express.Router();

router.get("/", getAllArticles);
router.get("/:article_id", getArticleById);
router.get("/:article_id/comments", getAllArticleComments);

router.post("/:article_id/comments", postArticleComment);

router.patch("/:article_id", patchArticleVote);

module.exports = router;
