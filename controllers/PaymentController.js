const { payment } = require("../models");

class PaymentController {
  static async getPayments(req, res) {
    try {
      const payments = await payment.findAll();
      res.status(200).send({ message: `Success Get Payments`, data: payments });
    } catch (error) {
      res.status(500).send({ message: `Error Get Payments`, error });
    }
  }
  static async getPaymentById(req, res) {
    try {
      const id = +req.params.id;
      const paymentById = await payment.findByPk(id);
      res.status(200).send({ message: `Success Get One Payment`, data: paymentById });
    } catch (error) {
      res.status(500).send({ message: `Error Get One Payment`, error });
    }
  }
  static async create(req, res) {
    try {
      const { name } = req.body;
      console.log(req.body);
      const newPayment = await payment.create({ name });
      res.status(200).send({ message: `Success Create Payment`, data: newPayment });
    } catch (error) {
      res.status(500).send({ message: `Error Create Payment`, error });
    }
  }
  static async delete(req, res) {
    try {
      const id = +req.params.id;
      const deletedPayment = await payment.findByPk(id);
      if (deletedPayment) {
        throw `Payment id ${id} does not exist !`;
      }
      await payment.destroy({ where: { id: id } });
      res.status(200).send({ message: `Success Delete Payment`, deletedData: deletedPayment });
    } catch (error) {
      res.status(500).send({ message: `Error Delete Payment`, error });
    }
  }
  static async update(req, res) {
    try {
      const id = +req.params.id;
      const { name } = req.body;
      const oldPayment = await payment.findByPk(id);
      await payment.update({ name }, { where: { id: id } });
      const updatedPayment = await payment.findByPk(id);
      if (!oldPayment || !updatedPayment) {
        throw `Payment id ${id} does not exist !`;
      }
      res.status(200).send({ message: `Success Update Payment`, oldData: oldPayment, updatedData: updatedPayment });
    } catch (error) {
      res.status(500).send({ message: `Error Update Payment`, error });
    }
  }
}

module.exports = PaymentController;
