const router = require('express').Router()
const controllerTodos = require('../controllers/controllerTodo')
const authoriz = require('../middleware/authoris')

router.get('/', controllerTodos.getAllTodo)
router.post('/', controllerTodos.createTodo)
// router.use(authoriz)
router.get('/:id', authoriz, controllerTodos.getOneTodo)
router.put('/:id', authoriz, controllerTodos.putTodo)
router.delete('/:id', authoriz, controllerTodos.deleteTodo)

module.exports = router







