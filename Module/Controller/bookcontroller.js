const httpStatus = require("http-status")
const Response = require("../Model/Response")
const Book = require("../Model/BookModel")
const bookValidator = require("../Utils/bookvalidator")
const { Op } = require("sequelize")

const get_books = async (req,res) =>{
    try {
        const result = await Book.findAll()

        if(!result || result.length === 0){
            const response = new Response.Error(true, "Books not Found")
            return res.status(httpStatus.NOT_FOUND).json(response)
        }

        const book = result.map((Book)=>{
            const { title, description, price} = Book
            return { title, description, price}
        })
        const response = new Response.Success(false, "Books Found", book)
        return res.status(httpStatus.OK).json(response)
    } catch (error) {
        const response = new Response.Error(true, error.message)
        return res.status(httpStatus.BAD_REQUEST).json(response)
    }
}

const add_book = async (req,res) =>{
    try {
        const data = await bookValidator.validateAsync(req.body)
        const result = await Book.create(data)

        if(!result){
            const response = new Response.Error(true, "Failed Add Book")
            return res.status(httpStatus.BAD_REQUEST).json(response)
        }

        const response = new Response.Success(false, "Success Add Book", result)
        return res.status(httpStatus.OK).json(response)
    } catch (error) {
        const response = new Response.Error(true, error.message)
        return res.status(httpStatus.BAD_REQUEST).json(response)
    }
}

const get_book_by_title = async (req,res)=>{
    try {
        const { title } = req.query
        const result = await Book.findAll({
            where:{
                title : { [Op.like]:`%${title}%`}
            }
        })

        if(!result || result.length === 0){
            const response = new Response.Error(true, "Cant find Book")
            return res.status(httpStatus.NOT_FOUND).json(response)
        }

        const response = new Response.Success(false, "Book Find", result)
        return res.status(httpStatus.OK).json(response)
    } catch (error) {
        const response = new Response.Error(true, error.message)
        return res.status(httpStatus.BAD_REQUEST).json(response)
    }
}

const get_book_by_id = async (req,res) => {
    try {
        const { id } = req.params
        const result = await Book.findOne({where:{id_book : id}})

        if(!result){
            const response = new Response.Error(true, "Cant find Book")
            return res.status(httpStatus.NOT_FOUND).json(response)
        }

        const response = new Response.Success(false, "Book Find", result)
        return res.status(httpStatus.OK).json(response)
    } catch (error) {
        const response = new Response.Error(true, error.message)
        return res.status(httpStatus.BAD_REQUEST).json(response)
    }
}

const update_book = async (req,res) =>{
    try {
        const { id } = req.params
        const data = await bookValidator.validateAsync(req.body)

        const result = await Book.update(
            data,
            {where:{id_book : id}}
        )

        if(result[0] === 0){
            const response = new Response.Error(true, "Failed update book")
            return res.status(httpStatus.BAD_REQUEST).json(response)
        }

        const updateBook = await Book.findOne({where:{id_book:id}})

        const response = new Response.Success(false, "Success update book", updateBook)
        return res.status(httpStatus.OK).json(response)
    } catch (error) {
        const response = new Response.Error(true, error.message)
        return res.status(httpStatus.BAD_REQUEST).json(response)
    }
}

const delete_book = async (req,res) =>{
    try {
        const { id } = req.params
        const result = await Book.destroy({where:{id_book : id}})

        if(!result || result.length === 0){
            const response = new Response.Error(true, "Failed delete book")
            return res.status(httpStatus.BAD_REQUEST).json(response)
        }

        const response = new Response.Success(false, "Success delete book", result)
        return res.status(httpStatus.OK).json(response)
    } catch (error) {
        const response = new Response.Error(true, error.message)
        return res.status(httpStatus.BAD_REQUEST).json(response)
    }
}

module.exports = { get_books, add_book, get_book_by_title, get_book_by_id, update_book, delete_book}