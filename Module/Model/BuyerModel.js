const { DataTypes } = require("sequelize");
const sequelize = require("../Database/connect");
const BookModel = require("../Model/BookModel");
const UserModel = require("../Model/UserModel");

const Buyer = sequelize.define("buyer", {
    id_buyer: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true
    },
    id_book: {
        type: DataTypes.INTEGER,
        allowNull: true,
        references: {
            model: BookModel,
            key: "id_book"
        }
    },
    id_user: {
        type: DataTypes.INTEGER,
        allowNull: true,
        references: {
            model: UserModel,
            key: "id_user"
        }
    },
    username: {
        type: DataTypes.STRING,
        allowNull: false
    },
    title_book: {
        type: DataTypes.STRING,
        allowNull: false
    },
    price_book: {
        type: DataTypes.INTEGER,
        allowNull: false
    },
    quantity: {
        type: DataTypes.INTEGER,
        allowNull: false
    },
    date_buying: {
        type: DataTypes.DATE,
        defaultValue: DataTypes.NOW
    },
    amount_book: {
        type: DataTypes.INTEGER,
        allowNull: false
    }
}, {
    timestamps: false
});

Buyer.belongsTo(BookModel, { foreignKey: 'id_book', as: 'book' });
Buyer.belongsTo(UserModel, { foreignKey: 'id_user', as: 'user' });

module.exports = Buyer;