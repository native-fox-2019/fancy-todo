const express = require('express')
const todoRouter = express.Router()
const TodoController = require('../controllers/TodoController')
const authentification = require('../middlewares/authentification')
const authorization = require('../middlewares/authorization')

todoRouter.post('/', authentification, TodoController.create)

todoRouter.get('/', authentification, TodoController.read)
todoRouter.get('/:task_id', authentification, authorization, TodoController.readById)

todoRouter.put('/:task_id', authentification, authorization, TodoController.update)

todoRouter.delete('/:task_id', authentification, authorization, TodoController.delete)

module.exports = todoRouter