const invoiceRoute = require('express').Router()
const InvoiceController = require('../controllers/InvoiceController.js')
const { isAdmin, isLogin } = require("../middlewares/auth");

invoiceRoute.get('/', isLogin, InvoiceController.getInvoices)
invoiceRoute.get('/all', isLogin, isAdmin, InvoiceController.getAllInvoices)
invoiceRoute.get('/:id', isLogin, InvoiceController.getInvoiceById)
invoiceRoute.post('/checkout', isLogin, InvoiceController.checkout)
// invoiceRoute.delete('/delete/:id', isLogin, isAdmin, InvoiceController.delete)

module.exports = invoiceRoute
