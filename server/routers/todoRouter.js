"use strict"
const todoController = require('../controllers/todoController')
const authentication = require('../middleware/authentication')
const authorization = require('../middleware/authorization')

const Router = require('express').Router()

Router
    .use(authentication)
Router
    .post('/', todoController.addTodo)
    .get('/', todoController.findAll)
    .get('/:id', todoController.findOne)
    .put('/:id', authorization, todoController.updateData)
    .patch('/:id', authorization, todoController.updateDataStatus)
    .delete('/:id', authorization, todoController.deleteData)



module.exports = Router