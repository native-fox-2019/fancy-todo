const express = require('express')
const router = express.Router()
const TodosController = require('../controllers/TodosController')
const authentication = require('../middlewares/authentication')
const authorization = require('../middlewares/authorization')

router.use(authentication)
router.post('/', TodosController.add)
router.get('/', TodosController.getAll)

router.get('/:id',authorization,TodosController.getOne)
router.put('/:id',authorization, TodosController.edit)
router.delete('/:id',authorization, TodosController.delete)


module.exports = router