var express = require('express')
var router = express.Router()

const todos = require(`./todosRoutes`)
const user = require(`./userroutes`)

router.use(`/todos`, todos)
router.use(`/users`, user)

module.exports = router