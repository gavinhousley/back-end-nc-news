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
        expect(typeof topics).toBe("object");
      });
  });
});
