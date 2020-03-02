const express = require('express')
const router = express.Router()

const Controller = require('../controllers/todoController.js')

router.post('/', Controller.add)
router.get('/', Controller.viewAll)

router.get('/:id', Controller.viewOne)
router.put('/:id', Controller.edit)
router.delete('/:id', Controller.delete)

module.exports = router