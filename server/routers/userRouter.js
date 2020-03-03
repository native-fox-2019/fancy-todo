"use strict"
const userController = require('../controllers/userController')
const Router = require('express').Router()

Router.post('/register', userController.register)
Router.post('/login', userController.login)


module.exports = Router
