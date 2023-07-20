const jwt = require("jsonwebtoken")
const httpStatus = require("http-status")
const User = require("../Model/UserModel")
const clearToken = require("../Utils/clearToken")
const Response = require("../Model/Response")

const userAuth = async (req, res, next) => {
    const token = req.headers.authorization
    const key = process.env.secret_key
    if (!token) {
        const response = new Response.Error(true, "Login Required")
        return res.status(httpStatus.UNAUTHORIZED).json(response)
    }
    try {
        const Token = clearToken(token)
        const decodeToken = jwt.verify(Token, key)
        const id_user = decodeToken.id
        const user = await User.findOne({
            where: { id_user: id_user }
        })

        if (!user) {
            const response = new Response.Error(true, "Login Required")
            return res.status(httpStatus.UNAUTHORIZED).json(response)
        }

        req.id_user = id_user
        req.user = user
        next()
    } catch (error) {
        const response = new Response.Error(true, "Login Required")
        return res.status(httpStatus.UNAUTHORIZED).json(response)
    }
}

module.exports = userAuth
