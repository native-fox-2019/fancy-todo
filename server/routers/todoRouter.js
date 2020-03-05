const todoRouter = require('express').Router()

const TodoController = require('../controllers/TodoController')
const authentication = require('../middlewares/authentication')
const authorization = require('../middlewares/authorization')

todoRouter.post('/', authentication, TodoController.create)
todoRouter.get('/', authentication, authorization, TodoController.read)
todoRouter.get('/:id', authentication, authorization, TodoController.readById)
todoRouter.put('/:id', authentication, authorization, TodoController.update)
todoRouter.delete('/:id', authentication, authorization, TodoController.delete)

module.exports = todoRouter