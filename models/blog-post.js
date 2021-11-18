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

blogPost.methods.findSimilarTags = function (cb) {
  return mongoose.model("blogpost").find({ tags: { $in: this.tags } }, cb);
};

blogPost.methods.findSimilarAreaOfExpertise = function (cb) {
  return mongoose.model("blogpost").find(
    {
      "author.areasOfExpertise": { $in: this.author.areasOfExpertise },
    },
    cb
  );
};

blogAuthor
  .virtual("fullName")
  .get(function () {
    return this.firstName + " " + this.lastName;
  })
  .set(function (v) {
    this.firstName = v.substr(0, v.indexOf(" "));
    this.lastName = v.substr(v.indexOf(" ") + 1);
  });

blogPost.virtual("createdAtGMT").get(function () {
  return this.createdAt.toUTCString();
});
module.exports = mongoose.model("blogpost", blogPost);
