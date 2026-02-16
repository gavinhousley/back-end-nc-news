const db = require("../db/connection");
const { NotFoundError, BadRequestError } = require("../errors/custom.errors");

exports.deleteCommentById = (comment_id) => {
  return db
    .query("DELETE FROM comments WHERE comment_id = $1 RETURNING *", [
      comment_id,
    ])
    .then(({ rows }) => {
      if (rows.length === 0) {
        throw new NotFoundError("Comment not found");
      }
      return rows[0];
    });
};
