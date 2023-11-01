'use strict';
const {
  Model
} = require('sequelize');
const { encryptPwd } = require("../helpers/bcrypt");
module.exports = (sequelize, DataTypes) => {
  class user extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      user.hasMany(models.product, {foreignKey: 'userId'})
      user.hasMany(models.cart, {foreignKey: 'userId'})
      // user.hasMany(models.invoice, {foreignKey: 'userId'})

    }
  }
  user.init({
    username: DataTypes.STRING,
    password: DataTypes.STRING,
    fullname: DataTypes.STRING,
    email: DataTypes.STRING,
    address: DataTypes.TEXT,
    avatar: DataTypes.TEXT,
    isAdmin: DataTypes.BOOLEAN
  }, {
    hooks: {
      beforeCreate: (user, options) => {
        user.password = encryptPwd(user.password);
        user.avatar = user.avatar || "https://banner2.cleanpng.com/20180402/ojw/kisspng-united-states-avatar-organization-information-user-avatar-5ac20804a62b58.8673620215226654766806.jpg";
        user.isAdmin = user.isAdmin || false;
      }
    },
    sequelize,
    modelName: 'user',
  });
  return user;
};