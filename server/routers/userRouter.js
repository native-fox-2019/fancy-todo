const userRouter = require('express').Router()

const UserController = require('../controllers/UserController')

userRouter.post('/login', UserController.login)
userRouter.post('/register', UserController.register)
userRouter.post('/googleLogin', UserController.googleLogin)

module.exports = userRouter