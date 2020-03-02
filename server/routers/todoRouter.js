"use strict"
const todoController = require('../controllers/todoController')
const Router = require('express').Router()

Router.post('/todos', todoController.addTodo)
Router.get('/todos', todoController.findAll)
Router.get('/todos/:id', todoController.findOne)
Router.put('/todos/:id', todoController.updateData)
Router.delete('/todos/:id', todoController.deleteData)



module.exports = Router