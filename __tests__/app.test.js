const db = require("../db/connection");
const seed = require("../db/seeds/seed");
const data = require("../db/data/test-data");
const app = require("../app.js");
const request = require("supertest");

beforeEach(() => {
  return seed(data);
});

afterAll(() => {
  return db.end();
});

describe("GET /api/topics/", () => {
  test("Get: 200 = Responds with a list of topics", () => {
    return request(app)
      .get("/api/topics/")
      .expect(200)
      .then(({ body }) => {
        const { topics } = body;
        expect(topics.length).toBeGreaterThan(0);
        expect(topics).toBeDefined();
        topics.forEach((topic) => {
          expect(typeof topic.description).toBe("string");
          expect(typeof topic.slug).toBe("string");
        });
      });
  });
});

describe("GET /api/articles/", () => {
  test("Get: 200 = Responds with a list of articles", () => {
    return request(app)
      .get("/api/articles/")
      .expect(200)
      .then(({ body }) => {
        const { articles } = body;
        articles.forEach((articles) => {
          expect(typeof articles.title).toBe("string");
          expect(typeof articles.author).toBe("string");
          expect(typeof articles.votes).toBe("number");
        });
      });
  });
  test("Get: 200 = Responds with an object with the key of articles and the value of an array of article objects without the body property", () => {
    return request(app)
      .get("/api/articles/")
      .expect(200)
      .then(({ body }) => {
        const { articles } = body;
        articles.forEach((articles) => {
          expect(typeof articles.body).toBe("undefined");
        });
      });
  });
  test("Get: 200 = Article array is ordered by creation date from newest first", () => {
    return request(app)
      .get("/api/articles/")
      .expect(200)
      .then(({ body }) => {
        const { articles } = body;
        expect(articles).toBeSortedBy("created_at", { descending: true });
      });
  });
  test("Get: 200 = Returning article array features a comment_count  ", () => {
    return request(app)
      .get("/api/articles/")
      .expect(200)
      .then(({ body }) => {
        const { articles } = body;
        expect(articles.length).not.toBe(0);
        articles.forEach((article) => {
          expect(typeof article.comment_count).toBe("number");
        });
      });
  });
  test("Get: 200 = Responds with an array of all users from that endpoint  ", () => {
    return request(app)
      .get("/api/users/")
      .expect(200)
      .then(({ body }) => {
        const { users } = body;
        expect(users.length).not.toBe(0);
        users.forEach((user) => {
          expect(typeof user.name).toBe("string");
          expect(typeof user.avatar_url).toBe("string");
        });
      });
  });
  test("Get: 200 = Responds with a given article at a specific article_id endpoint  ", () => {
    return request(app)
      .get("/api/articles/9")
      .expect(200)
      .then(({ body }) => {
        const { article } = body;
        expect(article.article_id).toBe(9);
        expect(article.author).toBe("butter_bridge");
        expect(article.title).toBe("They're not exactly dogs, are they?");
        expect(article.body).toBe("Well? Think about it.");
        expect(article.topic).toBe("mitch");
        expect(article.votes).toBe(0);
        expect(article.created_at).toBe("2020-06-06T09:10:00.000Z");
      });
  });
  test("Get: 200 = Responds with the comments from a given article_id endpoint", () => {
    return request(app)
      .get("/api/articles/9/comments")
      .expect(200)
      .then(({ body }) => {
        const { comments } = body;
        comments.forEach((comment) => {
          expect(typeof comment.body).toBe("string");
          expect(typeof comment.author).toBe("string");
          expect(typeof comment.votes).toBe("number");
        });
      });
  });
  test("Get: 200 = Responds with the comments from a given article_id endpoint and in order of most recent ", () => {
    return request(app)
      .get("/api/articles/9/comments")
      .expect(200)
      .then(({ body }) => {
        const { comments } = body;
        expect(comments).toBeSortedBy("created_at", { descending: true });
      });
  });
});

describe("POST /api/:article_id/comments", () => {
  test("Post: 201 = Responds with a confirmed created Comment on a specific article_id", () => {
    return request(app)
      .post("/api/articles/9/comments")
      .send({
        username: "butter_bridge",
        body: "Love this article so much!",
      })
      .expect(201)
      .then(({ body }) => {
        const { comment } = body;
        expect(comment.author).toBe("butter_bridge");
        expect(comment.body).toBe("Love this article so much!");
      });
  });
});

describe("PATCH /api/:article_id/votes", () => {
  test("Patch: 200 = Accepts an object to update the number of votes in an article.", () => {
    return request(app)
      .patch("/api/articles/9")
      .send({
        inc_votes: 1,
      })
      .expect(200)
      .then(({ body }) => {
        const { article } = body;
        expect(article.votes).toBe(1);
      });
  });

  test("Patch: 200 = Accepts an object to update the number of votes in an article by a larger amount.", () => {
    return request(app)
      .patch("/api/articles/9")
      .send({
        inc_votes: 15,
      })
      .expect(200)
      .then(({ body }) => {
        const { article } = body;
        expect(article.votes).toBe(15);
      });
  });
  test("Patch: 200 = Accepts an object to update the number of votes in an article by a negative amount.", () => {
    return request(app)
      .patch("/api/articles/9")
      .send({
        inc_votes: -5,
      })
      .expect(200)
      .then(({ body }) => {
        const { article } = body;
        expect(article.votes).toBe(-5);
      });
  });
});

describe("DELETE /api/comments/comment_id", () => {
  test("Delete: 204 = Accepts a comment_id to delete and responds with a status 204 and no content", () => {
    return request(app)
      .delete("/api/comments/3")
      .expect(204)
      .then(({ body }) => {
        expect(body).toEqual({});
      });
  });
});

describe("Invalid Endpoint", () => {
  test("404: Responds with a message when path is not found", () => {
    return request(app)
      .get("/api/invalid-path/")
      .expect(404)
      .then(({ body }) => {
        expect(body.msg).toBe("Path not found");
      });
  });
  test("404: Responds with a message when passed a valid but non-existent article_id", () => {
    return request(app)
      .get("/api/articles/9999")
      .expect(404)
      .then(({ body }) => {
        expect(body.msg).toBe("Sorry, that article does not exist");
      });
  });
  test("400: Responds with a message when passed an invalid article_id type", () => {
    return request(app)
      .get("/api/articles/banana")
      .expect(400)
      .then(({ body }) => {
        expect(body.msg).toBe("Sorry, the id type is invalid.");
      });
  });
});
