const BlogPostModel = require("../models/blog-post");

// Add your controllers below

const getAuthorDetails = async (req, res) => {
  const { id } = req.params;
  try {
    const blogPost = await BlogPostModel.findOne({ "author._id": id }).select({
      author: 1,
    });
    res.json(blogPost.author);
  } catch (err) {
    res.status(422).json({ message: err.message });
  }
};

const updateAuthorFullName = async (req, res) => {
  const { id } = req.params;
  const { newFullName } = req.body;
  try {
    const blogPost = await BlogPostModel.findOne({ "author._id": id });
    blogPost.author.fullName = newFullName;
    await blogPost.save();
    res.status(204).send();
  } catch (err) {
    res.status(422).json({ message: err.message });
  }
};

const getAuthorsWithSimilarExpertise = async (req, res) => {
  const { id } = req.params;
  try {
    const targetAuthorBlogPost = await BlogPostModel.findOne({
      "author._id": id,
    });
    const blogPostsWithSimilarAuthors =
      await targetAuthorBlogPost.findSimilarAuthors();

    const similarAuthors = {};
    blogPostsWithSimilarAuthors.forEach((blogPost) => {
      if (!similarAuthors[blogPost.author.fullName]) {
        similarAuthors[blogPost.author.fullName] = blogPost.author;
      }
    });
    res.json(Object.values(similarAuthors));
  } catch (err) {
    res.status(422).json({ message: err.message });
  }
};

module.exports = {
  getAuthorDetails,
  updateAuthorFullName,
  getAuthorsWithSimilarExpertise,
};
