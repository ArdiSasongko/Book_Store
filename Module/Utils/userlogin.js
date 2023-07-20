const joi = require("joi")

const userLogin = joi.object({
    username : joi.string().required(),
    password : joi.string().required()
})

module.exports = userLogin