const express = require('express')
const todoRouter = express.Router()
const TodoController = require('../controllers/TodoController')
const authentification = require('../middlewares/authentification')
const authorization = require('../middlewares/authorization')

todoRouter.post('/', authentification, TodoController.create)

todoRouter.get('/', TodoController.read)
todoRouter.get('/:id', authentification, authorization, TodoController.readById)

todoRouter.put('/:id', authentification, authorization, TodoController.update)

todoRouter.delete('/:id', authentification, authorization, TodoController.delete)

module.exports = todoRouter