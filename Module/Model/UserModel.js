const { DataTypes } = require("sequelize")
const sequelize = require("../Database/connect")

const User = sequelize.define("user",{
    id_user :{
        type : DataTypes.INTEGER,
        primaryKey : true,
        autoIncrement : true
    },
    username : {
        type : DataTypes.STRING,
        allowNull : false
    },
    email : {
        type : DataTypes.STRING,
        allowNull : false
    },
    password : {
        type : DataTypes.STRING,
        allowNull : false
    }
},{
    timestamps : false
})

module.exports = User