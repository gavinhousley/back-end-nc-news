class NotFoundError extends Error {
  constructor(message) {
    super(message);
    this.name = "Not Found Error";
  }
}

class BadRequestError extends Error {
  constructor(message) {
    super(message);
    this.name = "Bad Request Error";
  }
}

module.exports = { NotFoundError, BadRequestError };
