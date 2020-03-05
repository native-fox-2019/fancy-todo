const express = require("express")
const router = express.Router()

const todoControl = require('../controllers/todoControl')

const authentication = require('../middleware/authentication')
const authorization = require('../middleware/authorization')

router.get('/todos', authentication,todoControl.show)
router.get('/todos/:id', authentication,todoControl.find)
router.post('/todos', authentication, todoControl.create)
router.put('/todos/:id',authentication, authorization, todoControl.edit)
router.delete('/todos/:id', authentication, authorization, todoControl.delete)

module.exports = router