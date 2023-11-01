const cartRoute = require('express').Router()
const CartController = require('../controllers/CartController.js')
const { isAdmin, isLogin, isRegistered } = require("../middlewares/auth");

cartRoute.get('/', isLogin, CartController.getCarts)
// cartRoute.get('/:id', isLogin, isAdmin, CartController.getCartById)
cartRoute.post('/add', isLogin, CartController.add)
cartRoute.delete('/delete/:id', isLogin, CartController.delete)
cartRoute.put('/updateCount/:id', isLogin, CartController.updateCount)

module.exports = cartRoute
