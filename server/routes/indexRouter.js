var express = require('express')
var router = express.Router()
const userRouter = require('./userRouter')
const todoRouter = require('./todoRouter')
const authentication = require('../middlewares/authentication')

router.use('/users', userRouter)
router.use(authentication)
router.use('/todos', todoRouter)

module.exports = router