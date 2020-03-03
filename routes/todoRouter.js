const express = require("express")
const router = express.Router()

const todoControl = require('../controllers/todoControl')

const authentication = require('../middleware/authentication')
const authorization = require('../middleware/authorization')

router.get('/todos', todoControl.show)
router.get('/todos/:id', todoControl.find)
router.post('/todos', authentication, todoControl.create)
router.put('/todos/:id',authentication, authorization, todoControl.edit)
router.delete('/todos/:id', todoControl.delete)

module.exports = router