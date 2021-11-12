const mongoose = require("mongoose");

const blogAuthor = new mongoose.Schema({
  firstName: {
    type: String,
    required: true,
    maxlength: 120,
  },
  lastName: {
    type: String,
    required: true,
    maxlength: 120,
  },
  age: {
    type: Number,
    required: true,
  },
  gender: {
    type: String,
    required: true,
  },
  nationality: {
    type: String,
    required: true,
  },
  areasOfExpertise: [String],
});

const blogPost = new mongoose.Schema(
  {
    title: {
      type: String,
      required: true,
      maxlength: 120,
    },
    content: {
      type: String,
      required: true,
    },
    tags: [String],
    author: blogAuthor,
  },
  { timestamps: true }
);

module.exports = mongoose.model("blogpost", blogPost);
