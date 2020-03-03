const router = require('express').Router()

const todosController = require('../controllers/Todos')

router.post('/', todosController.create)

router.get('/', todosController.getTodo)
router.get('/:id', todosController.getOneTodo)

router.put('/:id', todosController.update)

router.delete('/:id', todosController.delete)

module.exports = router