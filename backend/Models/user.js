const { DataTypes } = require('sequelize');
const {sequelize}=require("../Configuration/connectDb");

const User = sequelize.define('Users', {
  UserID: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    autoIncrement: true,
  },
  FirstName: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  LastName: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  Email: {
    type: DataTypes.STRING,
    allowNull: false,
    unique: true,
  },
  Password: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  SubscriptionType: {
    type: DataTypes.STRING,
  },
  LastLoginDate: {
    type: DataTypes.DATE,
  },
});

module.exports = User;
