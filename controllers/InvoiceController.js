const { invoice, transaction, user, product, payment } = require("../models");

class InvoiceController {
  static async getAllInvoices(req, res) {
    try {
      const invoices = await invoice.findAll({
        include: {
          model:transaction,
          include: [product, user, payment]
        },
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
        include: {
          model: transaction,
          where: {
            userId: userData.id,
          },
          include: [product, user, payment]
        },
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
        where: { id: id },
        include: {
          model:transaction,
          include: [product, user, payment]
        },
      });
      res.status(200).send({ message: `Success Get Invoices ${userData.username}`, data: invoices });
    } catch (error) {
      res.status(500).send({ message: `Error Get Invoices`, error });
    }
  }
}

module.exports = InvoiceController;
