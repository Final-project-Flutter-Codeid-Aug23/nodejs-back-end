const paymentRoute = require('express').Router()
const PaymentController = require('../controllers/PaymentController.js')
const { isAdmin, isLogin } = require("../middlewares/auth");

paymentRoute.get('/', isLogin, PaymentController.getPayments)
paymentRoute.get('/:id', isLogin, PaymentController.getPaymentById)
paymentRoute.post('/create', isLogin, isAdmin, PaymentController.create)
paymentRoute.delete('/delete/:id', isLogin, isAdmin, PaymentController.delete)
paymentRoute.put('/update/:id', isLogin, isAdmin, PaymentController.update)

module.exports = paymentRoute
