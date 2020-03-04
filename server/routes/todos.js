const router = require('express').Router()
const controllerTodos = require('../controllers/controllerTodo')
// const authoriz = require('../middleware/authoris')

// router.use(authoriz)
router.get('/', controllerTodos.getAllTodo)
router.post('/', controllerTodos.createTodo)
router.get('/:id', controllerTodos.getOneTodo)
router.put('/:id', controllerTodos.putTodo)
router.delete('/:id', controllerTodos.deleteTodo)

module.exports = router







