const express = require('express')
const router = express.Router()
const CalendarController = require('../controllers/CalendarController')

router.use('/', CalendarController.showCalendar)

module.exports = router