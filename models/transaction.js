'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class transaction extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      transaction.belongsTo(models.user)
      transaction.belongsTo(models.product)
      transaction.belongsTo(models.payment)
    }
  }
  transaction.init({
    userId: DataTypes.INTEGER,
    productId: DataTypes.INTEGER,
    productCount: DataTypes.INTEGER,
    status: DataTypes.STRING,
    paymentId: DataTypes.INTEGER
  }, {
    hooks: {
      beforeCreate: (transaction, options) => {
        transaction.status = transaction.status || "On Process";
      }
    },
    sequelize,
    modelName: 'transaction',
  });
  return transaction;
};