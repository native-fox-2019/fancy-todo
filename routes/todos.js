const router = require('express').Router()

const todosController = require('../controllers/Todos')
const authorization = require('../middlewares/authorization')

router.post('/', todosController.create)

router.get('/', todosController.getTodo)
router.get('/:id', authorization, todosController.getOneTodo)

router.put('/:id', authorization, todosController.update)

router.delete('/:id', authorization, todosController.delete)

module.exports = router