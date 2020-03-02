'use strict'
const router = require('express').Router()
const Controller = require('../controllers/controllerTodos')

router.get('/', Controller.getAll)
router.get('/:id', Controller.getOne)
router.post('/', Controller.postTask)
router.put('/:id', Controller.updateData)
router.delete('/:id', Controller.deleteData)

module.exports = router