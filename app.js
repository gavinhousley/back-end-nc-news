const express = require("express");
const cors = require("cors");

const topicsRouter = require("./routes/topics.routes");
const articlesRouter = require("./routes/articles.routes");
const usersRouter = require("./routes/users.routes");
const commentsRouter = require("./routes/comments.routes");

const app = express();

app.use(cors());

app.use(express.json());

app.use("/api", express.static("public"));

app.use("/api/topics", topicsRouter);

app.use("/api/articles", articlesRouter);

app.use("/api/users", usersRouter);

app.use("/api/comments", commentsRouter);

app.use((req, res) => {
  res.status(404).send({ msg: "Path not found" });
});

const {
  cantFindErrors,
  probablyServerErrors,
} = require("./errors/error.handler");

app.use(cantFindErrors);
app.use(probablyServerErrors);

module.exports = app;
