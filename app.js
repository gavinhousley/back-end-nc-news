const express = require("express");

const topicsRouter = require("./routes/topics.routes");
const articlesRouter = require("./routes/articles.routes");
const usersRouter = require("./routes/users.routes");
const commentsRouter = require("./routes/comments.routes");

const app = express();

app.use(express.json());

app.use("/api", express.static("public"));

app.use("/api/topics", topicsRouter);

app.use("/api/articles", articlesRouter);

app.use("/api/users", usersRouter);

app.use("/api/comments", commentsRouter);

app.all("/*path", (req, res, next) => {
  res.status(404).send({ msg: "Path not found" });
});

module.exports = app;
