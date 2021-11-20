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

const getBlogPostsWithSimilarTags = async (req, res) => {
  const { id } = req.params;
  try {
    // Find by ID query
    const blogPost = await BlogPostModel.findById(id);

    const blogPsots = await blogPost.findSimilarTags();

    if (!blogPsots) {
      res
        .status(422)
        .json({ message: "the post you are looking for wasn't found" });
    } else {
      res.json(blogPsots);
    }
  } catch (err) {
    res.status(422).json({ message: err.message });
  }
};

const getGMTCreationTime = async (req, res) => {
  const { id } = req.params;
  try {
    // Find by ID query
    const blogPost = await BlogPostModel.findById(id);
    if (!blogPost) {
      res
        .status(422)
        .json({ message: "the post you are looking for wasn't found" });
    } else {
      res.json(blogPost.createdAtGMT);
    }
  } catch (err) {
    res.status(422).json({ message: err.message });
  }
};

module.exports = {
  addBlogPost,
  getAllBlogPosts,
  getBlogPostsWithSimilarTags,
  getGMTCreationTime,
};
