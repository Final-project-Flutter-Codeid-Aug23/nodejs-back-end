const productRoute = require('express').Router()
const ProductController = require('../controllers/ProductController.js')


productRoute.get('/', ProductController.getProducts)
productRoute.get('/:id', ProductController.getOneProduct)
productRoute.post('/create', ProductController.create)
productRoute.delete('/delete/:id', ProductController.delete)
productRoute.put('/update/:id', ProductController.update)

module.exports = productRoute
