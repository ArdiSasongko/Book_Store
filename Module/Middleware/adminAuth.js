const jwt = require("jsonwebtoken")
const httpStatus = require("http-status")
const Admin = require("../Model/AdminModel")
const clearToken = require("../Utils/clearToken")
const Response = require("../Model/Response")

const adminAuth = async (req,res,next) =>{
    const token = req.headers.authorization
    const key = process.env.secret_key

    if(!token){
        const response = new Response.Error(true, "Login Required")
        return res.status(httpStatus.UNAUTHORIZED).json(response)
    }
    try {
        const Token = clearToken(token)
        const decodeToken = jwt.verify(Token, key)
        const id_admin = decodeToken.id
        const admin = await Admin.findOne({
            where:{id_admin : id_admin}
        })

        if(!admin){
            const response = new Response.Error(true, "Login Required")
            return res.status(httpStatus.UNAUTHORIZED).json(response)
        }

        req.id_admin = id_admin
        req.admin = admin
        next()
    } catch (error) {
        const response = new Response.Error(true, "Login Required")
        return res.status(httpStatus.UNAUTHORIZED).json(response)
    }
}

module.exports = adminAuth