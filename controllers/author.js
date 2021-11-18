// Start coding here
const BlogPostModel = require("../models/blog-post");

const getAllAuthors = async (_, res) => {
  // First fetch all blog posts
  const blogPosts = await BlogPostModel.find();
  const authors = {};
  /* Create a unique map of authors, it will look like this:
    {
        author1Name: {author1},
        author2Name: {author2},
        author3Name: {author3},
        ... and so on
    }
    */
  blogPosts.forEach((blogPost) => {
    if (!authors[blogPost.author.fullName])
      authors[blogPost.author.fullName] = blogPost.author;
  });
  // The above check ensures that only unique authors are mapped, repeated authors will be skipped
  res.json(Object.values(authors));
  // Return array of unique author objects
};

module.exports = {
  getAllAuthors,
};
