const sequelize = require("../Database/connect")
const { DataTypes } = require("sequelize")

const BookModel = sequelize.define("data_book",{
    id_book : {
        type : DataTypes.INTEGER,
        primaryKey : true,
        autoIncrement : true
    },
    title : {
        type : DataTypes.STRING,
        allowNull : false
    },
    description : {
        type : DataTypes.STRING,
        allowNull : false
    },
    price : {
        type : DataTypes.INTEGER,
        allowNull : false
    },
    amount : {
        type : DataTypes.INTEGER,
        allowNull : false
    }
},{
    timestamps : false
})

module.exports = BookModel