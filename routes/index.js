const express = require('express')
const route = express.Router()
const todosRoute = require('./todosRoute')

route.use('/todos', todosRoute)

module.exports = route