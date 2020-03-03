"use strict"

const express = require('express')
const router = express.Router()

const Todo = require('./todoRouter.js')
const User = require('./userRouter.js')

// router.get(``, console.log('Homepage'))

router.use('/todos', Todo)
router.use('/user', User)

module.exports = router