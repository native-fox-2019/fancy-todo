const router = require('express').Router()

const todosRoutes = require('./todosRoutes')
const usersRoutes = require('./userRoutes')
const weatherRoutes = require('./weatherRoutes')
const authentication = require('../middlewares/authentication')


router.use('/users', usersRoutes)
router.use('/todos', authentication,todosRoutes)
router.use('/weather', weatherRoutes)

module.exports = router