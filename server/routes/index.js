const router = require('express').Router()
const todos = require('./todos')
const user = require('./user')
const authen = require('../middleware/authoten')

router.use('/user', user)
router.use(authen)
router.use('/todos', todos)

module.exports = router

