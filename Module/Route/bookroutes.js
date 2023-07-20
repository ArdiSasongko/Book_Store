const express = require("express");
const router = express.Router();
const bookController = require("../Controller/bookcontroller");

router.get("/", bookController.get_books);
router.get("/", bookController.get_book_by_title);
router.get("/:id", bookController.get_book_by_id);

module.exports = router;
