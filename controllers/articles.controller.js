const {
  getAllArticles: getAllArticlesService,
  getArticleById: getArticleByIdService,
  getAllArticleComments: getAllArticleCommentsService,
  postArticleComment: postArticleCommentService,
  patchArticleVote: patchArticleVoteService,
} = require("../services/articles.service");

exports.getAllArticles = (req, res, next) => {
  getAllArticlesService().then((articles) => {
    res.status(200).send({ articles });
  });
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
