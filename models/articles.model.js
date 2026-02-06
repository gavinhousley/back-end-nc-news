const db = require("../db/connection");

exports.fetchAllArticles = () => {
  return db
    .query(
      `SELECT 
        author,
        title,
        article_id,
        topic,
        created_at,
        votes,
        article_img_url
     FROM articles`,
    )
    .then(({ rows }) => rows);
};
