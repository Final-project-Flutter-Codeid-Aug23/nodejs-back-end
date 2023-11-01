const categoryRoute = require('express').Router()
const CategoryController = require('../controllers/CategoryController.js')
const { isAdmin, isLogin } = require("../middlewares/auth");

categoryRoute.get('/', isLogin, CategoryController.getCategories)
categoryRoute.get('/:id', isLogin, CategoryController.getCategoryById)
categoryRoute.post('/create', isLogin, isAdmin, CategoryController.create)
categoryRoute.delete('/delete/:id', isLogin, isAdmin, CategoryController.delete)
categoryRoute.put('/update/:id', isLogin, isAdmin, CategoryController.update)

module.exports = categoryRoute
