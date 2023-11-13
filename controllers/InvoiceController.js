const { invoice, transaction, user } = require("../models");

class InvoiceController {
  static async getAllInvoices(req, res) {
    try {
      const invoices = await invoice.findAll({
        include: [transaction],
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
        include: [transaction],
      });
      res.status(200).send({ message: `Success Get Invoices ${userData.username}`, data: invoices });
    } catch (error) {
      res.status(500).send({ message: `Error Get Invoices`, error });
    }
  }
}

module.exports = InvoiceController;
