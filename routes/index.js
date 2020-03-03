const router = require('express').Router()

const todosRoutes = require('./todos')
const UserController = require('../controllers/Users')

router.use('/todos', todosRoutes)

router.post('/register', UserController.register)

module.exports = router