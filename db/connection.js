const mongoose = require("mongoose");
const url = "mongodb://127.0.0.1:27017/blogs-db";

mongoose.connect(url, { useNewUrlParser: true });

db = mongoose.connection;

db.once("open", () => {
  console.log("Database connected:", url);
});

db.on("error", (err) => {
  console.error("connection error:", err);
});

module.exports = db;
