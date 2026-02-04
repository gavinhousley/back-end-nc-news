const express = require("express");

const app = express();

const db = require("./db/connection");

//const newsRouter = require("./routes/article.routes");

//app.use("/api/topics", newsRouter); // anything with this path goes to newsRouter

app.get("/api/topics/", (request, response) => {
  return db.query("SELECT * FROM topics;").then(({ rows }) => {
    response.status(200).send({ topics: rows });
  });
});

module.exports = app;
