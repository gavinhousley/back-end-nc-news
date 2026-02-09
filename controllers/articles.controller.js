const {
  getAllArticles: getAllArticlesService,
  getArticleById: getArticleByIdService,
} = require("../services/articles.service");

exports.getAllArticles = (req, res) => {
  getAllArticlesService().then((articles) => {
    res.status(200).send({ articles });
  });
};

exports.getArticleById = (req, res) => {
  const { article_id } = req.params;
  getArticleByIdService(article_id).then((article) => {
    if (article !== undefined) {
      res.status(200).send({ article: article });
    } else {
      res.status(404).send({ msg: "Sorry, that article does not exist" });
    }
  });
};
