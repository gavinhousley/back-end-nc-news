const express = require("express");
const cors = require("cors");
const rateLimit = require("express-rate-limit");
const topicsRouter = require("./routes/topics.routes");
const articlesRouter = require("./routes/articles.routes");
const usersRouter = require("./routes/users.routes");
const commentsRouter = require("./routes/comments.routes");

const app = express();

const limiter = rateLimit({
  windowMs: 15 * 60 * 1000,
  max: 100,
  message: { msg: "Too many requests, please try again later" },
});

app.use(cors());
app.use(express.json());
app.use(limiter);

app.use("/api", express.static("public"));
app.use("/api/topics", topicsRouter);
app.use("/api/articles", articlesRouter);
app.use("/api/users", usersRouter);
app.use("/api/comments", commentsRouter);

const {
  cantFindErrors,
  handleServerError,
  pathNotFoundError,
} = require("./errors/error.handler");

app.use(cantFindErrors);
app.use(handleServerError);
app.use(pathNotFoundError);

module.exports = app;
