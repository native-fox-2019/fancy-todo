const router = require('express').Router()

const todosController = require('../controllers/Todos')

router.post('/', todosController.create)
router.get('/', todosController.getTodo)

module.exports = router