const express = require("express")
const router = new express.Router();
const usercontroller = require("../Controller/usercontroller")
const bookcontroller = require("../Controller/bookcontroller")
const buyercontroller = require("../Controller/buyercontroller")
const requireAuth = require("../Middleware/userAuth")

router.post("/register", usercontroller.regUser)
router.post("/login", usercontroller.user_login)
router.use(requireAuth)
router.get("/Books", bookcontroller.get_books)
router.get("/Books/:id", bookcontroller.get_book_by_id)
router.post("/Books/buy", buyercontroller.buyBook)
router.get("/Books/history", buyercontroller.get_history)

module.exports = router