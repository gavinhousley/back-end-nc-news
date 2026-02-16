const { NotFoundError, BadRequestError } = require("../errors/custom.errors");

exports.cantFindErrors = (err, req, res, next) => {
  if (err instanceof NotFoundError) {
    return res.status(404).send({ msg: "Path not found" });
  }
  if (err instanceof BadRequestError) {
    return res.status(400).send({ msg: "Sorry, the syntax is invalid" });
  }
  next(err); // Pass to next middleware if not a custom error
};

exports.probablyServerErrors = (err, req, res, next) => {
  console.error(err);
  res.status(500).send({ msg: "Internal server error" });
};
