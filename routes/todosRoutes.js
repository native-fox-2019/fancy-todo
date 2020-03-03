var express = require('express')
var router = express.Router()

const { todos } = require(`../controllers`)

router.post(`/`, todos.create)

router.get(`/`, todos.showAll)

router.get(`/:id`, todos.findOne)

router.put(`/:id`, todos.update)

router.delete(`/:id`, todos.delete)

module.exports = router