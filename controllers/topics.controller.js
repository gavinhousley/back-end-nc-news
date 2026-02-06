const {
  getAllTopics: getAllTopicsService,
} = require("../services/topics.service");

exports.getAllTopics = (req, res) => {
  getAllTopicsService().then((topics) => {
    res.status(200).send({ topics });
  });
};
