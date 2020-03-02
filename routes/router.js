'use strict'

const router = require('express').Router()
const Controller = require('../controllers/controllers')
const routerTodos = require('../routes/routerTodos')

router.use('/todos',routerTodos)

module.exports = router