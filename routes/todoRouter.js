const express = require("express")
const router = express.Router()

const todoControl = require('../controllers/todoControl')

router.get('/todos', todoControl.show)
router.get('/todos/:id', todoControl.find)
router.post('/todos', todoControl.create)
router.put('/todos/:id', todoControl.edit)
router.delete('/todos/:id', todoControl.delete)

module.exports = router