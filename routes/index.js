const route = require('express').Router()
const productRoutes = require('./productRoutes.js')
const categoryRoutes = require('./categoryRoutes.js')

route.get('/', (req, res) => {
    res.redirect('/products')
})
route.use('/products', productRoutes);
route.use('/categories', categoryRoutes);
module.exports = route