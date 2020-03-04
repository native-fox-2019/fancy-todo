const router = require('express').Router()
const todoRoutes = require('./todoRoutes')
const userRoutes = require('./userRoutes')
const projectRoutes = require('./projectRoutes')

router.use('/todos', todoRoutes)
router.use('/', userRoutes)
router.use('/projects', projectRoutes)


module.exports = router