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
     FROM articles
     ORDER BY created_at DESC`,
    )
    .then(({ rows }) => rows);
};
