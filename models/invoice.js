'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class invoice extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      invoice.belongsTo(models.user)
      invoice.belongsTo(models.product)
      invoice.belongsTo(models.payment)
    }
  }
  invoice.init({
    userId: DataTypes.INTEGER,
    productId: DataTypes.INTEGER,
    productCount: DataTypes.INTEGER,
    paymentId: DataTypes.INTEGER
  }, {
    sequelize,
    modelName: 'invoice',
  });
  return invoice;
};