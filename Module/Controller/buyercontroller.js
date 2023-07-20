const Book = require("../Model/BookModel")
const User = require("../Model/UserModel")
const Buyer = require("../Model/BuyerModel")
const Response = require("../Model/Response")
const buyervalidator = require("../Utils/buyervalidator")
const httpStatus = require("http-status")

const buyBook = async(req,res) => {
    try {
        const data = await buyervalidator.validateAsync(req.body)
        const id_user = req.user.id_user

        const book = await Book.findByPk(data.id_book)
        if(!book){
            const response = new Response.Error(true, "Cant find book")
            return res.status(httpStatus.NOT_FOUND).json(response)
        }

        const user = await User.findByPk(id_user)
        if(!user){
            const response = new Response.Error(true, "Cant find user")
            return res.status(httpStatus.NOT_FOUND).json(response)
        }

        const price_book = book.price
        const amount_book = price_book*data.quantity

        const Buying = await Buyer.create({
            id_book: book.id_book,
            id_user,
            username: user.username,
            title_book: book.title,
            price_book,
            quantity: data.quantity,
            date_buying: new Date(),
            amount_book
        })

        const updateAmount = book.amount - data.quantity
        await Book.update({amount : updateAmount},{where:{id_book:data.id_book}})

        const response = new Response.Success(false, "Success buy book", Buying)
        return res.status(httpStatus.OK).json(response)
    } catch (error) {
        const response = new Response.Error(true, error.message)
        return res.status(httpStatus.BAD_REQUEST).json(response)
    }
}

module.exports = buyBook