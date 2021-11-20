// Start coding here

const blogPost = require("../models/blog-post");
const BlogPostModel = require("../models/blog-post");

const getAllBlogPosts = async (_, res) => {
  // Simple find query to fetch all blog posts
  const blogPosts = await BlogPostModel.find();
  res.json(blogPosts);
};

const addBlogPost = async (req, res) => {
  const blogPostData = req.body;
  try {
    // Simple create query to create a new blog post with the request body
    const newBlogPost = await BlogPostModel.create(blogPostData);
    res.status(201).json(newBlogPost);
  } catch (err) {
    res.status(422).json({ message: err.message });
  }
};

module.exports = {
  addBlogPost,
  getAllBlogPosts,
};
