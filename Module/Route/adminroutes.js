const express = require("express")
const router = new express.Router()
const admincontroller = require("../Controller/admincontroller")
const adminAuth = require("../Middleware/adminAuth")
const bookcontroller = require("../Controller/bookcontroller")
const usercontroller = require("../Controller/usercontroller")
const buyercontroller = require("../Controller/buyercontroller")

router.post("/register", admincontroller.regAdmin)
router.post("/login", admincontroller.logAdmin)
router.use(adminAuth)

//BOOK
router.get("/Books", bookcontroller.get_books)
router.get("/Books/Book/:id", bookcontroller.get_book_by_id)
router.get("/Books/Book", bookcontroller.get_book_by_title)
router.post("/Books/add", bookcontroller.add_book)
router.put("/Books/Book/:id", bookcontroller.update_book)
router.delete("/Books/Book/:id", bookcontroller.delete_book)

//User
router.get("/Users", usercontroller.getUser)

//Buyers
router.get("/Buyers", buyercontroller.getBuyer)

module.exports = router