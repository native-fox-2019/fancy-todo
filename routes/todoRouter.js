const router = require('express').Router()
const TodoController =require('../controllers/todoController')
const authenticationUser = require('../middlewares/authentication')

router.get('/',authenticationUser,TodoController.getTodo)
router.get('/:id',authenticationUser,TodoController.getTodoId)
router.post('/',authenticationUser,TodoController.addTodo)
router.put('/:id',authenticationUser,TodoController.editTodo)
router.delete('/:id',authenticationUser,TodoController.deleteTodo)


module.exports = router