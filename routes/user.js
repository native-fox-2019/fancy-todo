const router = require('express').Router()

const UserController = require('../controllers/Users')

router.post('/register', UserController.register)

module.exports = router