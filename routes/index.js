const router = require('express').Router()
const todoRoutes = require('./todoRoutes')
const userRoutes = require('./userRoutes')

router.use('/todos', todoRoutes)
router.use('/', userRoutes)

module.exports = router