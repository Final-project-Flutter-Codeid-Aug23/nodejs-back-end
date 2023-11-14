const { transaction, product, user, cart, payment, invoice } = require("../models");

class TransactionController {
  static async getAllTransactions(req, res) {
    try {
      const transactions = await transaction.findAll({
        include: [user, product, payment],
      });
      res.status(200).send({ message: `Success Get All Transactions`, data: transactions });
    } catch (error) {
      res.status(500).send({ message: `Error Get All Transactions`, error });
    }
  }
  static async getTransactions(req, res) {
    try {
      const userData = req.body.userData;
      const transactions = await transaction.findAll({
        where: { userId: userData.id },
        include: [user, product, payment],
      });
      res.status(200).send({ message: `Success Get Transactions ${userData.username}`, data: transactions });
    } catch (error) {
      res.status(500).send({ message: `Error Get Transactions`, error });
    }
  }
  static async getTransactionById(req, res) {
    try {
      const id = +req.params.id;
      const userData = req.body.userData;
      const transactionById = await transaction.findByPk(id, {
        include: [user, product, payment],
      });
      res.status(200).send({ message: `Success Get Transactions ${userData.username}`, data: transactionById });
    } catch (error) {
      res.status(500).send({ message: `Error Get Transactions`, error });
    }
  }
  static async checkout(req, res) {
    try {
      const { userData, productId, productCount, paymentId } = req.body;
      const updatedProduct = await product.findOne({ where: { id: +productId } });
      if (!updatedProduct) throw `Product does not exist`;
      await product.update({ stock: updatedProduct.stock - productCount }, { where: { id: +productId } });
      await cart.destroy({ where: { productId: +productId, userId: userData.id, productCount: +productCount } });
      const newTransaction = await transaction.create({
        userId: +userData.id,
        productId: +productId,
        productCount: +productCount,
        paymentId: +paymentId,
      });
      res.status(200).send({ message: `Success Adding Transaction`, data: newTransaction });
    } catch (error) {
      res.status(500).send({ message: `Error Adding Transaction`, error });
    }
  }
  static async delivery(req, res) {
    try {
      const id = +req.params.id;
      const { userData } = req.body;
      const oldTransaction = await transaction.findOne({ where: { id: +id } });
      if (!oldTransaction) throw `Transaction does not exist`;
      await transaction.update({ status: "On Delivery" }, { where: { id: +id } });
      const updatedTransaction = await transaction.findOne({ where: { id: +id } });
      res
        .status(200)
        .send({
          message: `Success Update Status Delivery Transaction`,
          oldData: oldTransaction,
          updatedData: updatedTransaction,
        });
    } catch (error) {
      res.status(500).send({ message: `Error Update Status Delivery Transaction`, error });
    }
  }
  static async arrive(req, res) {
    try {
      const id = +req.params.id;
      const { userData } = req.body;
      const oldTransaction = await transaction.findOne({ where: { id: +id } });
      if (!oldTransaction) throw `Transaction does not exist`;
      await transaction.update({ status: "Arrived at Destination" }, { where: { id: +id } });
      const updatedTransaction = await transaction.findOne({ where: { id: +id } });
      res
        .status(200)
        .send({
          message: `Success Update Status Arrive Transaction`,
          oldData: oldTransaction,
          updatedData: updatedTransaction,
        });
    } catch (error) {
      res.status(500).send({ message: `Error Update Status Arrive Transaction`, error });
    }
  }
  static async cancel(req, res) {
    try {
      const id = +req.params.id;
      const { userData } = req.body;
      const oldTransaction = await transaction.findOne({ where: { id: +id } });
      if (oldTransaction.status === "Done") throw `Cannot cancel transaction that is already done!`;
      if (!oldTransaction) throw `Transaction does not exist`;
      const updatedProduct = await product.findOne({ where: { id: +oldTransaction.productId } });
      if (!updatedProduct) throw `Product does not exist`;
      await transaction.update({ status: "Cancelled" }, { where: { id: +id } });
      await product.update(
        { stock: updatedProduct.stock + oldTransaction.productCount },
        { where: { id: +oldTransaction.productId } }
      );
      const updatedTransaction = await transaction.findOne({ where: { id: +id } });
      res
        .status(200)
        .send({
          message: `Success Update Status Cancel Transaction`,
          oldData: oldTransaction,
          updatedData: updatedTransaction,
        });
    } catch (error) {
      res.status(500).send({ message: `Error Update Status Cancel Transaction`, error });
    }
  }
  static async done(req, res) {
    try {
      const id = +req.params.id;
      const { userData } = req.body;
      const oldTransaction = await transaction.findOne({ where: { id: +id } });
      if (!oldTransaction) throw `Transaction does not exist`;
      await transaction.update({ status: "Done" }, { where: { id: +id } });
      const updatedProduct = await product.findOne({ where: { id: +oldTransaction.productId } });
      if (!updatedProduct) throw `Product does not exist`;
      const newInvoice = await invoice.create({ transactionId: id });
      const updatedTransaction = await transaction.findOne({ where: { id: +id } });
      await product.update(
        { unitSold: updatedProduct.unitSold + oldTransaction.productCount },
        { where: { id: +oldTransaction.productId } }
      );
      res
        .status(200)
        .send({
          message: `Success Update Status Done Transaction`,
          oldData: oldTransaction,
          updatedData: updatedTransaction,
        });
    } catch (error) {
      res.status(500).send({ message: `Error Update Status Done Transaction`, error });
    }
  }
}

module.exports = TransactionController;
