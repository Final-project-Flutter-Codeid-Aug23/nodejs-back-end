const transactionRoute = require('express').Router()
const TransactionController = require('../controllers/TransactionController.js')
const { isAdmin, isLogin } = require("../middlewares/auth");

transactionRoute.get('/', isLogin, TransactionController.getTransactions)
transactionRoute.get('/all', isLogin, isAdmin, TransactionController.getAllTransactions)
transactionRoute.get('/:id', isLogin, TransactionController.getTransactionById)
transactionRoute.post('/checkout', isLogin, TransactionController.checkout)
transactionRoute.put('/delivery/:id', isLogin, isAdmin, TransactionController.delivery)
transactionRoute.put('/arrive/:id', isLogin, TransactionController.arrive)
// transactionRoute.delete('/delete/:id', isLogin, isAdmin, TransactionController.delete)

module.exports = transactionRoute
