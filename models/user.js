const { DataTypes, Model } = require("sequelize");

const sequelize = require("../utils/database");

class User extends Model {
  getFullName() {
    return this.firstName + this.lastName;
  }
}

User.init(
  {
    id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true,
    },
    username: {
      type: DataTypes.STRING(128),
      allowNull: false,
      unique: true,
    },
    firstName: {
      type: DataTypes.STRING(255),
      allowNull: false,
    },
    lastName: {
      type: DataTypes.STRING(255),
      defaultValue: "",
    },
    email: {
      type: DataTypes.STRING(128),
      allowNull: false,
      unique: true,
    },
    password: {
      type: DataTypes.STRING(255),
      allowNull: false,
    },
  },
  {
    sequelize: sequelize,
  }
);

module.exports = User;
