const express = require('express')
const router = express.Router()
const todosRoute = require('./todosRoute')
const userRoute = require('./userRoute')
const calendarRoute = require('./calendarRoute')

router.use('/todos', todosRoute)
router.use('/user', userRoute)
router.use('/calendar', calendarRoute)

module.exports = router