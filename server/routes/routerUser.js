'use strict'

const router = require('express').Router()
const ControllerUser = require('../controllers/controllerUser')

router.post('/register', ControllerUser.register)
router.post('/login', ControllerUser.login)
router.post('/google_login', ControllerUser.google_login)
router.put('/',ControllerUser.update)
// router.use()
// router.delete('/delete/:id', ControllerUser.delete)

module.exports = router