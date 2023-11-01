const userRoute = require('express').Router()
const UserController = require('../controllers/UserController.js')
const { isAdmin, isLogin, isRegistered } = require("../middlewares/auth");

userRoute.get('/', isLogin, isAdmin, UserController.getUsers)
userRoute.get('/:id', isLogin, isAdmin, UserController.getUserById)
userRoute.post('/login', UserController.login)
userRoute.post('/register', isRegistered, UserController.register)
userRoute.delete('/delete/:id', isAdmin, UserController.delete)
userRoute.put('/update/:id', isLogin, UserController.update)
userRoute.put('/changePassword/:id', isLogin, UserController.changePassword)

module.exports = userRoute
