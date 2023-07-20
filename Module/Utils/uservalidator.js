const joi = require("joi")

const uservalidator = joi.object({
    username : joi.string().required(),
    email : joi.string().email().required(),
    password : joi.string().required()
})

module.exports = uservalidator