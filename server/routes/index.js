const router = require('express').Router()
const todos = require('./todos')
// const user = require('./user')

//authen

router.use('/todos', todos)

module.exports = router

