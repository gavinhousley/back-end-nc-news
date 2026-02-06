const db = require("../db/connection");

exports.fetchAllTopics = () => {
  return db.query("SELECT * FROM topics").then(({ rows }) => rows);
};

exports.fetchTopicById = (topic_id) => {
  return db
    .query("SELECT * FROM topics where topic_id = $1", [topic_id])
    .then(({ rows }) => rows[0]);
};
