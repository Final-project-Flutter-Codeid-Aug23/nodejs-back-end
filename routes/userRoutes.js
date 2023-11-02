const userRoute = require('express').Router()
const UserController = require('../controllers/UserController.js')
const { isAdmin, isLogin, isRegistered } = require("../middlewares/auth");

userRoute.get('/', isLogin, isAdmin, UserController.getUsers)
userRoute.get('/detail/:id', isLogin, isAdmin, UserController.getUserById)
userRoute.get('/profile', isLogin, UserController.profile)
userRoute.post('/login', UserController.login)
userRoute.post('/register', isRegistered, UserController.register)
userRoute.delete('/delete/:id', isLogin, isAdmin, UserController.delete)
userRoute.put('/update/:id', isLogin, UserController.update)
userRoute.put('/changePassword/:id', isLogin, UserController.changePassword)

module.exports = userRoute
