const router = require('express').Router()
const TodoController = require('../controllers/TodoController')
const authentication = require('../middlewares/authentication')
const {todoAuthorization, projectAuthorization} = require('../middlewares/authorization')



router.get('/', authentication, TodoController.findAll)
router.post('/', authentication, TodoController.create)
router.get('/:id', TodoController.findById)
router.put('/:id', authentication, todoAuthorization, TodoController.update)
router.delete('/:id', authentication, todoAuthorization, TodoController.delete)

module.exports = router