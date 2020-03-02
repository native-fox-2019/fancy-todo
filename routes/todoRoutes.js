const router = require('express').Router()
const TodoController = require('../controllers/TodoController')
const cors = require('cors')



router.get('/', TodoController.findAll)
router.post('/', TodoController.create)
router.get('/:id', TodoController.findById)
router.put('/:id', TodoController.update)
router.delete('/:id', TodoController.delete)

module.exports = router