var express = require('express')
var router = express.Router()

const { todos } = require(`../controllers`)
const author = require(`../middleware/authorization`)

router.get(`/`, todos.showAll)

router.get(`/:id`, todos.findOne)

router.all(author)

router.post(`/`, todos.create)

router.put(`/:id`, todos.update)

router.delete(`/:id`, todos.delete)

module.exports = router