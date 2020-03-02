const express = require('express')
const router = express.Router()
const controller = require('../controller/todoController.js')

router.get('/',controller.view)
router.post('/',controller.add)
router.get('/:id',controller.getTodo)
router.put('/:id',controller.update)
router.delete('/:id',controller.delete)

module.exports = router