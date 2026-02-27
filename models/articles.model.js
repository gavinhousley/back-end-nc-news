const db = require("../db/connection");
const { NotFoundError, BadRequestError } = require("../errors/custom.errors");

exports.fetchAllArticles = (sort_by = "created_at", order = "DESC") => {
  const queryRequest = `SELECT 
        articles.author,
        articles.title,
        articles.article_id,
        articles.topic,
        articles.created_at,
        articles.votes,
        articles.article_img_url,
        COUNT(comments.comment_id) ::INT AS comment_count
     FROM articles
     LEFT JOIN comments ON comments.article_id = articles.article_id 
     GROUP BY articles.article_id
     ORDER BY ${sort_by} ${order.toUpperCase()}
     `;

  return db.query(queryRequest).then(({ rows }) => rows);
};

exports.fetchArticleById = (article_id) => {
  return db
    .query(
      `SELECT 
        articles.author,
        articles.title,
        articles.article_id,
        articles.body,
        articles.topic,
        articles.created_at,
        articles.votes,
        articles.article_img_url,
        COUNT(comments.comment_id) ::INT AS comment_count
     FROM articles
     LEFT JOIN comments ON comments.article_id = articles.article_id 
     WHERE articles.article_id = $1
     GROUP BY articles.article_id`,
      [article_id],
    )
    .then(({ rows }) => rows[0]);
};

exports.fetchAllArticleComments = (article_id) => {
  return db
    .query(
      "SELECT * FROM comments WHERE article_id = $1 ORDER BY created_at DESC ",
      [article_id],
    )
    .then(({ rows }) => rows);
};

exports.insertArticleComment = (article_id, newComment) => {
  const { username, body } = newComment;
  return db
    .query(
      `INSERT INTO comments (article_id, author, body)
        VALUES ($1, $2, $3)
        RETURNING *`,
      [article_id, username, body],
    )
    .then(({ rows }) => rows[0])
    .catch((err) => {
      if (err.code === "23503") {
        if (err.constraint === "comments_article_id_fkey") {
          throw new NotFoundError("Article not found");
        }
        if (err.constraint === "comments_author-fkey") {
          throw new NotFoundError("User not found");
        }
      }

      throw err;
    });
};

exports.updateArticleVote = (article_id, inc_votes) => {
  return db
    .query(
      `UPDATE articles
      SET votes = votes + $1
      WHERE article_id =  $2
      RETURNING *`,
      [inc_votes, article_id],
    )
    .then(({ rows }) => {
      return rows[0];
    })
    .catch((err) => {
      console.log(err);
      throw err;
    });
};
