const mongoose = require("mongoose");

const blogAuthor = new mongoose.Schema({
  firstName: {
    type: String,
  },
  lastName: {
    type: String,
  },
  age: {
    type: Number,
  },
  gender: {
    type: String,
  },
  nationality: {
    type: String,
  },
  areasOfExpertise: {
    type: [String],
  },
},
// To ensure that virtual fields are returned to the client side
{
  toObject: {
    virtuals: true
  },
  toJSON: {
    virtuals: true 
  }
});

const blogPost = new mongoose.Schema(
  {
    title: {
      type: String,
    },
    content: {
      type: String,
    },
    tags: {
      type: [String],
    },
    likes: {
      type: Number,
    },
    author: blogAuthor,
  },
  { timestamps: true }
);

// Virtual field for full name with get and set functions
blogAuthor
  .virtual("fullName")
  .get(function () {
    return this.firstName + " " + this.lastName;
  })
  .set(function (fullName) {
    this.set("firstName", fullName.substr(0, fullName.indexOf(" ")));
    this.set("lastName", fullName.substr(fullName.indexOf(" ") + 1));
  });

// Custom static method to find similar authors by matching areas of expertise
blogPost.methods.findSimilarAuthors = function (cb) {
  return this.model("blogpost").find(
    {
      "author.areasOfExpertise": { $in: this.author.areasOfExpertise },
      _id: { $ne: this._id}
    },
    cb
  );
};

// Custom static method to find similar blog posts by matching tags
blogPost.methods.findSimilarBlogPosts = function (cb) {
  return this.model("blogpost").find(
    {
      "tags": { $in: this.tags },
      _id: { $ne: this._id}
    },
    cb
  );
};

// Virtual field to get blogpost creation time in GMT
blogPost.virtual("createdAtGMT").get(function () {
  return this.createdAt.toUTCString();
});

module.exports = mongoose.model("blogpost", blogPost);
