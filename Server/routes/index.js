const router = require('express').Router()

const todosRoutes = require('./todosRoutes')
const usersRoutes = require('./userRoutes')
const authentication = require('../middlewares/authentication')


router.use('/users', usersRoutes)
router.use('/todos', authentication,todosRoutes)

module.exports = router