'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class product extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      product.belongsToMany(models.category, {through: models.productCategory});
      product.hasMany(models.productImage, {foreignKey: 'productId'})
      product.belongsTo(models.user)
      product.hasMany(models.cart, {foreignKey: 'productId'})
      // product.hasMany(models.invoice, {foreignKey: 'productId'})
    }
  }
  product.init({
    userId: DataTypes.INTEGER,
    name: DataTypes.STRING,
    description: DataTypes.TEXT,
    stock: DataTypes.INTEGER,
    price: DataTypes.INTEGER,
    unitSold: DataTypes.INTEGER,
  }, {
    hooks: {
      beforeCreate: (product, options) => {
        product.unitSold = 0;
        product.stock = product.stock || 1;
      }
    },
    sequelize,
    modelName: 'product',
  });
  return product;
};