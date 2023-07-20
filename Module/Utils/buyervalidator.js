const joi = require("joi")

const buyervalidator = joi.object({
    id_book : joi.number().required(),
    quantity : joi.number().required()
})

module.exports = buyervalidator