const controllerUser = require('../controllers/controllerUser')
const router = require('express').Router()


router.post('/register', controllerUser.registerUser)
router.post('/login', controllerUser.loginUser)
router.post('/googleSignIn', controllerUser.googleSign)

module.exports = router