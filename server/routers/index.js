const router = require('express').Router()

router.use('/todos', require('./todoRouter'))
router.use('/users', require('./userRouter'))
router.use('/seeHolidays', require('./holidayRouter'))

module.exports = router