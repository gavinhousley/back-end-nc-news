const {
  getAllArticles: getAllArticlesService,
  getArticleById: getArticleByIdService,
  getAllArticleComments: getAllArticleCommentsService,
  postArticleComment: postArticleCommentService,
  patchArticleVote: patchArticleVoteService,
} = require("../services/articles.service");

exports.getAllArticles = (req, res, next) => {
  const { sort_by = "created_at", order = "desc" } = req.query;
  const validColumns = [
    "created_at",
    "votes",
    "title",
    "author",
    "comment_count",
  ];
  if (!validColumns.includes(sort_by)) {
    return res.status(400).send({ msg: "Invalid sort_by column" });
  }
  if (order !== "asc" && order !== "desc") {
    return res.status(400).send({ msg: "Invalid order query" });
  }

  getAllArticlesService(sort_by, order)
    .then((articles) => {
      res.status(200).send({ articles });
    })
    .catch(next);
};

exports.getArticleById = (req, res, next) => {
  const { article_id } = req.params;
  if (isNaN(Number(article_id))) {
    return res.status(400).send({ msg: "Sorry, the id type is invalid" });
  }
  getArticleByIdService(article_id).then((article) => {
    if (article !== undefined) {
      res.status(200).send({ article: article });
    } else {
      res.status(404).send({ msg: "Article not found" });
    }
  });
};

exports.getAllArticleComments = (req, res, next) => {
  const { article_id } = req.params;
  if (isNaN(Number(article_id))) {
    return res.status(400).send({ msg: "Invalid article_id" });
  }
  getAllArticleCommentsService(article_id).then((comments) => {
    res.status(200).send({ comments: comments });
  });
};

exports.postArticleComment = (req, res, next) => {
  const { article_id } = req.params;
  const newComment = req.body;
  if (isNaN(Number(article_id))) {
    return res.status(400).send({ msg: "Invalid article_id" });
  }
  if (!newComment.username || !newComment.body) {
    return res
      .status(400)
      .send({ msg: "Sorry there is not enough information to Post." });
  }

  postArticleCommentService(article_id, newComment)
    .then((createdComment) => {
      res.status(201).send({ comment: createdComment });
    })
    .catch(next);
};

exports.patchArticleVote = (req, res, next) => {
  const { article_id } = req.params;
  const { inc_votes } = req.body;
  patchArticleVoteService(article_id, inc_votes).then((updatedArticle) => {
    res.status(200).send({ article: updatedArticle });
  });
};
