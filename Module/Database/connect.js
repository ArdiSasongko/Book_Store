const {Sequelize} = require("sequelize")

const sequelize = new Sequelize("book_store", "root", "",{
    host : "127.0.0.1",
    port : "3306",
    dialect : "mysql"
})

module.exports = sequelize