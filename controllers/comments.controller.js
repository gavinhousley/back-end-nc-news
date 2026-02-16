const {
  deleteComment: deleteCommentService,
} = require("../services/comments.service");

exports.deleteComment = (req, res, next) => {
  const { comment_id } = req.params;
  if (isNaN(Number(comment_id))) {
    return res.status(400).send({ msg: "Sorry, the id type is invalid." });
  }
  deleteCommentService(comment_id)
    .then(() => {
      res.status(204).send();
    })
    .catch(next);
};
