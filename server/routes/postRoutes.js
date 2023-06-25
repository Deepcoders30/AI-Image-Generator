const express = require("express");
const dotenv = require("dotenv");
dotenv.config();
const postController = require("../controllers/postController");
const router = express.Router();

router.route("/").get(postController.getAllPosts);
router.route("/").post(postController.createPost);

module.exports = router;
