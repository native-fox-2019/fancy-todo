var express = require('express')
var router = express.Router()

const todos = require(`./todosRoutes`)

router.use(`/todos`, todos)

module.exports = router