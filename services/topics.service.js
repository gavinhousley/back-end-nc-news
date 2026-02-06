const { fetchAllTopics, fetchTopicById } = require("../models/topics.model");

exports.getAllTopics = () => {
  return fetchAllTopics();
};
