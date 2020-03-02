const controllerTodos = require('../controllers/controllerTodo')
const router = require('express').Router()
//autoheris

router.get('/', controllerTodos.getAllTodo)

module.exports = router







