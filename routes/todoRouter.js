const router = require('express').Router()
const TodoController = require('../controllers/todoController')
const authenticationUser = require('../middlewares/authentication')
const authorizationUser = require('../middlewares/authorization')

router.post('/', authenticationUser, TodoController.addTodo)
router.get('/', authenticationUser, TodoController.getTodo)
router.get('/:id', authenticationUser, authorizationUser, TodoController.getTodoId)
router.put('/:id', authenticationUser, authorizationUser, TodoController.editTodo)
router.delete('/:id', authenticationUser, authorizationUser, TodoController.deleteTodo)


module.exports = router