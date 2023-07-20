const Response = require("../Model/Response")
const Admin = require("../Model/AdminModel")
const httpStatus = require("http-status")
const adminvalidator = require("../Utils/uservalidator")
const adminLogin = require("../Utils/userlogin")
const Bcrypt = require("../Utils/bcrypt")
const jwt = require("jsonwebtoken")

const regAdmin = async (req,res) =>{
    try {
        const data = await adminvalidator.validateAsync(req.body)
        const byUsername = await Admin.findOne({where:{username : data.username}})
        const byEmail = await Admin.findOne({where:{email : data.email}})

        if(byUsername){
            const response = new Response.Error(true, "Username already exists")
            return res.status(httpStatus.BAD_REQUEST).json(response)
        }

        if(byEmail){
            const response = new Response.Error(true, "Username already exists")
            return res.status(httpStatus.BAD_REQUEST).json(response)
        }

        const hash = await Bcrypt.hash(data.password)
        data.password = hash

        const result = await Admin.create(data)

        const response = new Response.Success(false, "Registering admin success", result)
        return res.status(httpStatus.OK).json(response)
    } catch (error) {
        const response = new Response.Error(true, error.message)
        return res.status(httpStatus.BAD_REQUEST).json(response)
    }
}

const logAdmin = async (req,res) =>{
    const key = process.env.secret_key
    try {
        const data = await adminLogin.validateAsync(req.body)
        const user = await Admin.findOne({where: {username : data.username}})

        if(!user){
            const response = new Response.Error(true, "Invalid Username")
            return res.status(httpStatus.BAD_REQUEST).json(response)
        }

        const password = await Bcrypt.compare(
            data.password, user.password
        )

        if(!password){
            const response = new Response.Error(true, "Invalid Password")
            return res.status(httpStatus.BAD_REQUEST).json(response)
        }

        const createToken = jwt.sign({id : user.id_admin}, key)
        const result = { token : createToken, username : user.username}
        const response = new Response.Success(false, "Success Login", result)
        return res.status(httpStatus.OK).json(response)
    } catch (error) {
        const response = new Response.Error(true, error.message)
        return res.status(httpStatus.BAD_REQUEST).json(response)
    }
}

module.exports = { regAdmin, logAdmin}