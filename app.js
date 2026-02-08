const express = require("express");

const app = express();

app.use(express.json());

const db = require("./db/connection");

const topicsRouter = require("./routes/topics.routes");
const articlesRouter = require("./routes/articles.routes");
const usersRouter = require("./routes/users.routes");

app.use("/api/topics", topicsRouter);
app.use("/api/articles", articlesRouter);
app.use("/api/users", usersRouter);

app.all("/*path", (req, res, next) => {
  res.status(404).send({ msg: "Path not found" });
});

module.exports = app;
