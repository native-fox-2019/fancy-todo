const express = require('express')
const router = express.Router()
const UserController = require('../controllers/UserController')

router.use('/todos', require('./todoRouter'))
router.use('/users', require('./userRouter'))
router.get('/seeHolidays', UserController.holidays)

module.exports = router