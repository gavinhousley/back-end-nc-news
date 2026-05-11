const {
  getAllTopics: getAllTopicsService,
} = require("../services/topics.service");

exports.getAllTopics = (req, res, next) => {
  getAllTopicsService()
    .then((topics) => {
      res.status(200).send({ topics });
    })
    .catch((err) => {
      next(err);
    });
};
