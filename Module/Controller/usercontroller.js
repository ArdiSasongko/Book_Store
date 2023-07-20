const Response = require("../Model/Response")
const User = require("../Model/UserModel")
const Bcrypt = require("../Utils/bcrypt")
const userLogin = require("../Utils/userlogin")
const uservalidator = require("../Utils/uservalidator")
const httpStatus = require("http-status")
const jwt = require("jsonwebtoken")

const regUser = async(req,res) =>{
    try {
        const user = await uservalidator.validateAsync(req.body)
        const byUsername = await User.findOne({where:{username : user.username}})
        const byEmail = await User.findOne({where:{email : user.email}})

        if(byUsername){
            const response = new Response.Error(true, "Usename already exists")
            return res.status(httpStatus.BAD_REQUEST).json(response)
        }
        if(byEmail){
            const response = new Response.Error(true, "Email already exists")
            return res.status(httpStatus.BAD_REQUEST).json(response)
        }

        const hash = await Bcrypt.hash(user.password)
        user.password = hash

        const result = await User.create(user)

        const response = new Response.Success(false, "Registering User Success", result)
        return res.status(httpStatus.OK).json(response)
    } catch (error) {
        const response = new Response.Error(true, error.message)
        return res.status(httpStatus.BAD_REQUEST).json(response)
    }
}

const user_login = async (req,res) =>{
    const key = process.env.secret_key
    try {
        const request = await userLogin.validateAsync(req.body)
        const user = await User.findOne({where:{username : request.username}})

        if(!user){
            const response = new Response.Error(true, "Invalid Username")
            return res.status(httpStatus.BAD_REQUEST).json(response)
        }

        const password = await Bcrypt.compare(
            request.password, user.password
        )

        if(!password){
            const response = new Response.Error(true, "Invalid Password")
            return res.status(httpStatus.BAD_REQUEST).json(response)
        }

        const createToken = jwt.sign({id : user.id_user}, key)
        const result = { token : createToken, username : user.username}
        const response = new Response.Success(false, "Success Login", result)
        return res.status(httpStatus.BAD_REQUEST).json(response)
    } catch (error) {
        const response = new Response.Error(true, error.message)
        return res.status(httpStatus.BAD_REQUEST).json(response)
    }
}

module.exports = {regUser, user_login}