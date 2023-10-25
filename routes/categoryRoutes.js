const categoryRoute = require('express').Router()
const CategoryController = require('../controllers/CategoryController.js')


categoryRoute.get('/', CategoryController.getCategories)
categoryRoute.get('/:id', CategoryController.getOneCategory)
categoryRoute.post('/create', CategoryController.create)
categoryRoute.delete('/delete/:id', CategoryController.delete)
categoryRoute.put('/update/:id', CategoryController.update)

module.exports = categoryRoute
