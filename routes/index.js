const express = require('express')
const router = express.Router()
const todosRoute = require('./todosRoute')
const userRoute = require('./userRoute')

router.use('/todos', todosRoute)
router.use('/user', userRoute)

module.exports = router