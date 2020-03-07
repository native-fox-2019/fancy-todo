'use strict'

const router = require('express').Router()
const ControllerUser = require('../controllers/controllerUser')
const authentication = require('../middlewares/authentication')

router.post('/register', ControllerUser.register)
router.post('/login', ControllerUser.login)
router.post('/google_login', ControllerUser.google_login)
router.put('/',ControllerUser.update)
router.get('/', authentication,ControllerUser.getUser)

module.exports = router