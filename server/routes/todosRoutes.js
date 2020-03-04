var express = require('express')
var router = express.Router()

const { todos } = require(`../controllers`)
const author = require(`../middleware/authorization`)

router.get(`/`, todos.showAll)

router.post(`/`, todos.create)

router.get(`/:id`, author, todos.findOne)

router.put(`/:id`, author, todos.update)

router.delete(`/:id`, author, todos.delete)

module.exports = router