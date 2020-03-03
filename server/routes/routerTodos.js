'use strict'
const router = require('express').Router()
const Controller = require('../controllers/controllerTodos')
const authorization = require('../middlewares/authorization')

router.get('/', Controller.getAll)
router.get('/:id', authorization, Controller.getOne)
router.post('/', Controller.postTask)
router.put('/:id', authorization, Controller.updateData)
router.delete('/:id', authorization, Controller.deleteData)

module.exports = router