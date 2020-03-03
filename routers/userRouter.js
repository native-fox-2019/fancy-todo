"use strict"

const express = require('express')
const router = express.Router()

const Controller = require('../controllers/userController.js')

router.post('/', Controller.register)
router.get('/', Controller.login)

module.exports = router