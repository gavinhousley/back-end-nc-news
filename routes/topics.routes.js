const express = require("express");

const { getAllTopics } = require("../controllers/topics.controller.js");

const router = express.Router();

router.get("/", getAllTopics);

module.exports = router;
