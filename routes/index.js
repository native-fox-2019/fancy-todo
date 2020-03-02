'use strict'
require('dotenv').config()
const router = require('express').Router()
const routerTodos = require('./routerTodos')
const routerUser = require('./routerUser')
const authentication = require('../middlewares/authentication')

router.use('/users',routerUser)
// router.use(authentication)
router.use('/todos',routerTodos)

module.exports = router