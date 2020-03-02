const router = require('express').Router()
const TodoController =require('../controllers/todoController')

router.get('/',TodoController.getTodo)
router.get('/:id',TodoController.getTodoId)
router.post('/',TodoController.addTodo)
// router.put('/',TodoController.editTodo)
// router.delete('/',TodoController.deleteTodo)


module.exports = router