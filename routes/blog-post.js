const express = require("express");
const router = express.Router();

const blogPostController = require("../controllers/blog-post");

router.get("/", blogPostController.getAllBlogPosts);
router.post("/", blogPostController.addBlogPost);
router.get("/tags/:id", blogPostController.getBlogPostsWithSimilarTags);
router.get("/utc/:id", blogPostController.getGMTCreationTime);

module.exports = router;
