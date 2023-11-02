const { invoice, product, user, cart, payment } = require("../models");

class InvoiceController {
  static async getAllInvoices(req, res) {
    try {
      const invoices = await invoice.findAll({
        include: [user, product, payment],
      });
      res.status(200).send({ message: `Success Get All Invoices`, data: invoices });
    } catch (error) {
      res.status(500).send({ message: `Error Get All Invoices`, error });
    }
  }
  static async getInvoices(req, res) {
    try {
      const userData = req.body.userData;
      const invoices = await invoice.findAll({
        where: { userId: userData.id },
        include: [user, product, payment],
      });
      res.status(200).send({ message: `Success Get Invoices ${userData.username}`, data: invoices });
    } catch (error) {
      res.status(500).send({ message: `Error Get Invoices`, error });
    }
  }
  static async getInvoiceById(req, res) {
    try {
      const id = req.params.id;
      const userData = req.body.userData;
      const invoices = await invoice.findByPk({
        where: { id: id, userId: userData.id },
        include: product,
      });
      res.status(200).send({ message: `Success Get Invoices ${userData.username}`, data: invoices });
    } catch (error) {
      res.status(500).send({ message: `Error Get Invoices`, error });
    }
  }
  static async checkout(req, res) {
    try {
      const { userData, productId, productCount, paymentId } = req.body;
      const deletedCart = await cart.findOne({ where: { productId: +productId, userId: userData.id, productCount: +productCount } });
      if (!deletedCart) {
        throw `Cart does not exist !`;
      }
      await cart.destroy({ where: { productId: +productId, userId: userData.id, productCount: +productCount } });
      const newInvoice = await invoice.create({
        userId: +userData.id,
        productId: +productId,
        productCount: +productCount,
        paymentId: +paymentId,
      });
      res.status(200).send({ message: `Success Adding Invoice`, data: newInvoice });
    } catch (error) {
      res.status(500).send({ message: `Error Adding Invoice`, error });
    }
  }
  // static async delete(req, res) {
  //   try {
  //     const id = req.params.id;
  //     const userData = req.body.userData;
  //     const deletedInvoice = await invoice.findByPk(id, { include: product });
  //     if (!deletedInvoice) {
  //       throw `Invoice id ${id} does not exist !`;
  //     }
  //     await invoice.destroy({ where: { id: id, userId: userData.id } });
  //     res.status(200).send({ message: `Success Deleting Invoice`, deletedData: deletedInvoice });
  //   } catch (error) {
  //     res.status(500).send({ message: `Error Deleting Invoice`, error });
  //   }
  // }
}

module.exports = InvoiceController;
