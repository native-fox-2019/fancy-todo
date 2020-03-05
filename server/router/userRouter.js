const express = require('express')
const router = express.Router()
const controller = require('../controller/userController.js')

router.post('/register',controller.register)
router.post('/login',controller.login)
router.post('/logingoogle',controller.googleLogin)


module.exports = router