const db = require("../connection");
const format = require("pg-format");
const createLookUpObject = require("../seeds/utils");

const seed = ({ topicData, userData, articleData, commentData }) => {
  return db
    .query(`DROP TABLE IF EXISTS comments`)
    .then(() => {
      return db.query(`DROP TABLE IF EXISTS articles`);
    })
    .then(() => {
      return db.query(`DROP TABLE IF EXISTS users`);
    })
    .then(() => {
      return db.query(`DROP TABLE IF EXISTS topics`);
    })
    .then(() => {
      return db.query(
        `CREATE TABLE topics(
                    slug VARCHAR(200) PRIMARY KEY,
                    description VARCHAR(300),
                    img_url VARCHAR(1000))`,
      );
    })
    .then(() => {
      return db.query(`CREATE TABLE users(
                            username VARCHAR(200) PRIMARY KEY,
                            name VARCHAR(100),
                            avatar_url VARCHAR(1000))`);
    })
    .then(() => {
      return db.query(`CREATE TABLE articles(
                              article_id SERIAL PRIMARY KEY,
                              title VARCHAR(100),
                              topic VARCHAR(200),
                              FOREIGN KEY (topic) REFERENCES topics(slug),
                              author VARCHAR(200), 
                              FOREIGN KEY (author) REFERENCES users(username),
                              body TEXT,
                              created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
                              votes INT DEFAULT 0,
                              article_img_url VARCHAR(1000))`);
    })
    .then(() => {
      return db.query(`CREATE TABLE comments(
                      comment_id SERIAL PRIMARY KEY,
                      article_id INT NOT NULL,
                      FOREIGN KEY (article_id) REFERENCES articles(article_id),
                      body TEXT,
                      votes INT DEFAULT 0,
                      author VARCHAR(200),
                      FOREIGN KEY (author) REFERENCES users(username),
                      created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP)`);
    })
    .then(() => {
      const formattedTopicData = topicData.map((topic) => {
        return [topic.description, topic.slug, topic.img_url];
      });
      const queryStr1 = format(
        `INSERT INTO topics (description, slug, img_url) VALUES %L RETURNING *`,
        formattedTopicData,
      );
      return db.query(queryStr1);
    })
    .then(() => {
      const formattedUserData = userData.map((user) => {
        return [user.username, user.name, user.avatar_url];
      });
      const queryStr2 = format(
        `INSERT INTO users (username, name, avatar_url) VALUES %L RETURNING *`,
        formattedUserData,
      );
      return db.query(queryStr2);
    })
    .then(() => {
      const formattedArticleData = articleData.map((article) => {
        return [
          article.title,
          article.topic,
          article.author,
          article.body,
          article.created_at,
          article.votes,
          article.article_img_url,
        ];
      });
      const queryStr3 = format(
        `INSERT INTO articles (title, topic, author, body, created_at, votes, article_img_url) VALUES %L RETURNING *`,
        formattedArticleData,
      );
      return db.query(queryStr3);
    })
    .then(({ rows }) => {
      const dbArticles = rows;
      const articleLookUpObject = createLookUpObject(
        dbArticles,
        "title",
        "article_id",
      );

      const formattedCommentData = commentData.map((comment) => {
        return [
          articleLookUpObject[comment.article_title],
          comment.body,
          comment.votes,
          comment.author,
          comment.created_at,
        ];
      });
      const queryStr4 = format(
        `INSERT INTO comments (article_id, body, votes, author, created_at) VALUES %L`,
        formattedCommentData,
      );
      return db.query(queryStr4);
    });
};
module.exports = seed;
