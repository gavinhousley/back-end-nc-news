const { NotFoundError, BadRequestError } = require("../errors/custom.errors");

exports.cantFindErrors = (err, req, res, next) => {
  if (err instanceof NotFoundError) {
    return res.status(404).send({ msg: err.message });
  }
  if (err instanceof BadRequestError) {
    return res.status(400).send({ msg: err.message });
  }
  next(err);
};

exports.handleServerError = (err, req, res, next) => {
  console.error(err);
  res.status(500).send({ msg: "Internal server error" });
};

exports.pathNotFoundError = (req, res, next) => {
  res.status(404).send({ msg: "Path not found" });
};
