const router = require('express').Router()
const controllerTodo = require('../controllers/controllerTodo')
const author = require('../middlewares/authorization')

router.post('/', controllerTodo.add)
router.get('/', controllerTodo.readAll)
router.get('/:id', author, controllerTodo.readOne)
router.delete('/:id', author, controllerTodo.destroy)
router.put('/:id', author, controllerTodo.edit)

module.exports = router