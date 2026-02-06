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
});
