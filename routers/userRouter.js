const express = require('express')
const userRouter = express.Router()
const UserController = require('../controllers/UserController')
const authentification = require('../middlewares/authentification')

userRouter.get('/', UserController.read)
userRouter.get('/:id', )
userRouter.post('/register', UserController.register)
userRouter.post('/login', UserController.login)

module.exports = userRouter