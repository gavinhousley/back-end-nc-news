const {
  getAllArticles: getAllArticlesService,
} = require("../services/articles.service");

exports.getAllArticles = (req, res) => {
  getAllArticlesService().then((articles) => {
    res.status(200).send({ articles });
  });
};
