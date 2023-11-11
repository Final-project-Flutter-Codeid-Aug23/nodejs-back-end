const { transaction, product, user, cart, payment } = require("../models");

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
      const id = req.params.id;
      const userData = req.body.userData;
      const transactions = await transaction.findByPk({
        where: { id: id, userId: userData.id },
        include: product,
      });
      res.status(200).send({ message: `Success Get Transactions ${userData.username}`, data: transactions });
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
      const id = req.params.id;
      const { userData } = req.body;
      const oldTransaction = await transaction.findOne({ where: { id: +id } });
      if (!oldTransaction) throw `Transaction does not exist`;
      await transaction.update({ status: "On Delivery" }, { where: { id: +id } });
      const updatedTransction = await transaction.findOne({ where: { id: +id } });
      res.status(200).send({ message: `Success Update Status Delivery Transaction`, oldData: oldTransaction, updatedData: updatedTransction });
    } catch (error) {
      res.status(500).send({ message: `Error Update Status Delivery Transaction`, error });
    }
  }
  static async arrive(req, res) {
    try {
      const id = req.params.id;
      const { userData } = req.body;
      const oldTransaction = await transaction.findOne({ where: { id: +id } });
      if (!oldTransaction) throw `Transaction does not exist`;
      await transaction.update({ status: "Arrived at Destination" }, { where: { id: +id } });
      const updatedTransction = await transaction.findOne({ where: { id: +id } });
      res.status(200).send({ message: `Success Update Status Arrive Transaction`, oldData: oldTransaction, updatedData: updatedTransction });
    } catch (error) {
      res.status(500).send({ message: `Error Update Status Arrive Transaction`, error });
    }
  }
  // static async delete(req, res) {
  //   try {
  //     const id = req.params.id;
  //     const userData = req.body.userData;
  //     const deletedTransaction = await transaction.findByPk(id, { include: product });
  //     if (!deletedTransaction) {
  //       throw `Transaction id ${id} does not exist !`;
  //     }
  //     await transaction.destroy({ where: { id: id, userId: userData.id } });
  //     res.status(200).send({ message: `Success Deleting Transaction`, deletedData: deletedTransaction });
  //   } catch (error) {
  //     res.status(500).send({ message: `Error Deleting Transaction`, error });
  //   }
  // }
}

module.exports = TransactionController;
