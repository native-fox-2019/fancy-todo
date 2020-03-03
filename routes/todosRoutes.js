var express = require('express')
var router = express.Router()

const { todos } = require(`../controllers`)

router.post(`/`, todos.create)

router.get(`/`, todos.showAll)


module.exports = router