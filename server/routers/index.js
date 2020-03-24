"use strict"

const express = require('express')
const router = express.Router()
const authentication = require('../middlewares/authentication.js')
const authorization = require('../middlewares/authorization.js')

const Task = require('../controllers/taskController.js')
const User = require('../controllers/userController.js')

router.post('/user/register', User.register)
router.post('/user/login', User.login)
router.post('/user/googleLogin',User.googleLogin)

router.get('/tasks', authentication, Task.list)
router.post('/tasks', authentication, Task.add)

router.get('/tasks/:id', authentication, authorization, Task.getOne)
router.put('/tasks/:id', authentication, authorization, Task.edit)
router.delete('/tasks/:id', authentication, authorization, Task.delete)

router.get('/quote', authentication, Task.getQuote)


module.exports = router