const router = require('express').Router()

const todosRoutes = require('./todos')
const UserController = require('../controllers/Users')
const authentication = require('../middlewares/authenticantion')

router.post('/register', UserController.register)
router.post('/login', UserController.login)

router.use('/todos', authentication, todosRoutes)

module.exports = router