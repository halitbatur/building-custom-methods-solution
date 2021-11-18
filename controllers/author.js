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

const filterAuthorsByEreas = async (req, res) => {
  const { id } = req.params;
  const blogPosts = await BlogPostModel.find();
  // console.log(blogPosts);
  let targetedAuthoreBlogPost;
  const authors = {};
  blogPosts.forEach((blogPost) => {
    if (blogPost.author.id === id) {
      targetedAuthoreBlogPost = blogPost;
    }
  });
  const filteredBlogPosts =
    await targetedAuthoreBlogPost.findSimilarAreaOfExpertise();
  // console.log(filteredBlogPosts);
  filteredBlogPosts.forEach((filteredBlogPost) => {
    if (!authors[filteredBlogPost.author.firstName]) {
      authors[filteredBlogPost.author.firstName] = filteredBlogPost.author;
    }
  });
  try {
    res.json(Object.values(authors));
  } catch (err) {
    res.status(422).json({ message: err.message });
  }
};

const getAuthorsFullName = async (_, res) => {
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
  res.json(Object.values(authors).map((author) => author.fullName));
  // Return array of unique author objects
};

const updateAuthorFullName = async (req, res) => {
  const authorFirstName = req.params.firstName;
  const query = {
    "author.firstName": authorFirstName,
  };
  const updateSet = {
    "author.fullName": req.body.fullName,
  };
  try {
    const updatedBlogPosts = await BlogPostModel.updateMany(query, {
      $set: updateSet,
    });
    res.json({ updated: updatedBlogPosts });
  } catch (err) {
    res.status(422).json({ message: err.message });
  }
};

const updateAuthor = async (req, res) => {
  const authorName = req.params.name;
  const query = {
    "author.name": authorName,
  };
  const updateSet = {};
  /* Request body might give us values like this:
    {
        age: 28,
        areasOfExpertise: ["design", "ux/ui", "art"]
    }
    */
  Object.keys(req.body).forEach((key) => {
    updateSet[`author.${key}`] = req.body[key];
  });
  /* The above logic changes to:
    {
        "author.age": 28,
        "author.areasOfExpertise": ["design", "ux/ui", "art"]
    }
    Since MongoDB query requires nested keys for author object
    */
  const updatedBlogPosts = await BlogPostModel.updateMany(query, {
    $set: updateSet,
  });
  res.json({ updated: updatedBlogPosts });
};

module.exports = {
  getAllAuthors,
  getAuthorsFullName,
  updateAuthorFullName,
  updateAuthor,
  filterAuthorsByEreas,
};
