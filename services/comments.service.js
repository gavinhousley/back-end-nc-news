const { deleteCommentById } = require("../models/comments.model");

exports.deleteComment = (comment_id) => {
  return deleteCommentById(comment_id);
};
