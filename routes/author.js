const express = require("express");
const router = express.Router();

const authorController = require("../controllers/author");

router.get("/", authorController.getAllAuthors);
router.get("/fullnames", authorController.getAuthorsFullName);
router.put("/:firstName", authorController.updateAuthorFullName);
router.get("/areas/:id", authorController.filterAuthorsByEreas);

module.exports = router;
