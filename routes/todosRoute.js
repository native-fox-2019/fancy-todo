const express = require('express')
const route = express.Router()
const TodosController = require('../controllers/TodosController')

route.post('/', TodosController.add)
route.get('/', TodosController.getAll)
route.get('/:id', TodosController.getOne)
route.put('/:id', TodosController.edit)
route.delete('/:id', TodosController.delete)


module.exports = route