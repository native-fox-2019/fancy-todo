"use strict"
const todoController = require('../controllers/todoController')
const Router = require('express').Router()

Router.post('/', todoController.createTodo)



module.exports = Router