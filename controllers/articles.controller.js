const {
  getAllArticles: getAllArticlesService,
  getArticleById: getArticleByIdService,
  getAllArticleComments: getAllArticleCommentsService,
  postArticleComment: postArticleCommentService,
  patchArticleVote: patchArticleVoteService,
} = require("../services/articles.service");

exports.getAllArticles = (req, res) => {
  getAllArticlesService().then((articles) => {
    res.status(200).send({ articles });
  });
};

exports.getArticleById = (req, res) => {
  const { article_id } = req.params;
  if (isNaN(Number(article_id))) {
    return res.status(400).send({ msg: "Sorry, the id type is invalid." });
  }
  getArticleByIdService(article_id).then((article) => {
    if (article !== undefined) {
      res.status(200).send({ article: article });
    } else {
      res.status(404).send({ msg: "Sorry, that article does not exist" });
    }
  });
};

exports.getAllArticleComments = (req, res) => {
  const { article_id } = req.params;
  if (isNaN(Number(article_id))) {
    return res.status(400).send({ msg: "Invalid article_id" });
  }
  getAllArticleCommentsService(article_id).then((comments) => {
    res.status(200).send({ comments: comments });
  });
};

exports.postArticleComment = (req, res) => {
  const { article_id } = req.params;
  const newComment = req.body;
  if (isNaN(Number(article_id))) {
    return res.status(400).send({ msg: "Invalid article_id" });
  }

  postArticleCommentService(article_id, newComment)
    .then((createdComment) => {
      res.status(201).send({ comment: createdComment });
    })
    .catch((err) => {
      console.log(err);
      res.status(500).send({ msg: "Server error" });
    });
};

exports.patchArticleVote = (req, res, next) => {
  const { article_id } = req.params;
  const { inc_votes } = req.body;
  patchArticleVoteService(article_id, inc_votes).then((updatedArticle) => {
    res.status(200).send({ article: updatedArticle });
  });
};
