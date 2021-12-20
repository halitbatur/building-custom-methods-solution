const BlogPostModel = require("../models/blog-post");

// The controller to fetch all blogposts has been written for you
const getAllBlogPosts = async (_, res) => {
  try {
    const blogPosts = await BlogPostModel.find();
    res.json(blogPosts);
  } catch (err) {
    res.status(422).json({ message: err.message });
  }
};

// The controller to add a new blogpost has been written for you
const addBlogPost = async (req, res) => {
  const blogPostData = req.body;
  try {
    const newBlogPost = await BlogPostModel.create(blogPostData);
    res.status(201).json(newBlogPost);
  } catch (err) {
    res.status(422).json({ message: err.message });
  }
};

// Add your controllers below

const getBlogPostsWithSimilarTags = async (req, res) => {
  const { id } = req.params;
  try {
    const targetBlogPost = await BlogPostModel.findById(id);
    // Calling our custom method findSimilarBlogPosts on the model object
    const blogPostsWithSimilarTags = await targetBlogPost.findSimilarBlogPosts();
    res.json(blogPostsWithSimilarTags);
  } catch (err) {
    res.status(422).json({ message: err.message });
  }
};

const getCreatedAtTimeGMT = async (req, res) => {
  const { id } = req.params;
  try {
    const blogPost = await BlogPostModel.findById(id);
    if (blogPost) res.json(blogPost.createdAtGMT);
    else res.status(422).json({ message: "Not found" });
  } catch (err) {
    res.status(422).json({ message: err.message });
  }
};

module.exports = {
  getAllBlogPosts,
  addBlogPost,
  getBlogPostsWithSimilarTags,
  getCreatedAtTimeGMT,
};
