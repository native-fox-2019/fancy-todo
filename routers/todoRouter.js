const express = require('express')
const todoRouter = express.Router()
const TodoController = require('../controllers/TodoController')
const authentification = require('../middlewares/authentification')

todoRouter.post('/', authentification, TodoController.create)

todoRouter.get('/', TodoController.read)
todoRouter.get('/:id', TodoController.readById)

todoRouter.put('/:id', TodoController.update)

todoRouter.delete('/:id', TodoController.delete)

module.exports = todoRouter