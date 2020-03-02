'use strict'

const router = require('express').Router()
const ControllerUser = require('../controllers/controllerUser')
const bcrypt = require('bcrypt')
const authentication =require('../middlewares/authentication')

router.post('/register', ControllerUser.register)
router.post('/login', ControllerUser.login)
router.delete('/delete/:id', ControllerUser.delete)
module.exports = router