const route = require('express').Router()
const productRoutes = require('./productRoutes.js')
const categoryRoutes = require('./categoryRoutes.js')
const userRoutes = require('./userRoutes.js')
const paymentRoutes = require('./paymentRoutes.js')
const cartRoutes = require('./cartRoutes.js')
const transactionRoutes = require('./transactionRoutes.js')
const invoiceRoutes = require('./invoiceRoutes.js')

route.post('/', (req, res) => {
    res.redirect('/users/login')
})
route.use('/products', productRoutes);
route.use('/categories', categoryRoutes);
route.use('/users', userRoutes);
route.use('/payments', paymentRoutes);
route.use('/carts', cartRoutes);
route.use('/transactions', transactionRoutes);
route.use('/invoices', invoiceRoutes);
module.exports = route