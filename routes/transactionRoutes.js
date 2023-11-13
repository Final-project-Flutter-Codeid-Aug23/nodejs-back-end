const transactionRoute = require('express').Router()
const TransactionController = require('../controllers/TransactionController.js')
const { isAdmin, isLogin } = require("../middlewares/auth");

transactionRoute.get('/', isLogin, TransactionController.getTransactions)
transactionRoute.get('/all', isLogin, isAdmin, TransactionController.getAllTransactions)
transactionRoute.get('/:id', isLogin, TransactionController.getTransactionById)
transactionRoute.post('/checkout', isLogin, TransactionController.checkout)
transactionRoute.put('/delivery/:id', isLogin, isAdmin, TransactionController.delivery)
transactionRoute.put('/arrive/:id', isLogin, isAdmin, TransactionController.arrive)
transactionRoute.put('/cancel/:id', isLogin, TransactionController.cancel)
transactionRoute.put('/done/:id', isLogin, TransactionController.done)

module.exports = transactionRoute
