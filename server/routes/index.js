var express = require('express')
var router = express.Router()

const todos = require(`./todosRoutes`)
const user = require(`./userroutes`)
const authen = require(`../middleware/authentication`)

router.use(`/users`, user)

router.use(authen)

router.use(`/todos`, todos)

module.exports = router