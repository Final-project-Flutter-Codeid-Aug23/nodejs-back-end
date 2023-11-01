const route = require('express').Router()
const productRoutes = require('./productRoutes.js')
const categoryRoutes = require('./categoryRoutes.js')
const userRoutes = require('./userRoutes.js')
const cartRoutes = require('./cartRoutes.js')

route.get('/', (req, res) => {
    res.redirect('/users/login')
})
route.use('/products', productRoutes);
route.use('/categories', categoryRoutes);
route.use('/users', userRoutes);
route.use('/:username/carts', cartRoutes);
module.exports = route