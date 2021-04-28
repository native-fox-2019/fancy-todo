const router = require('express').Router()
const controllerUser = require('../controllers/controllerUser')

// >>>> /users

router.post('/register', controllerUser.register)
router.get('/', controllerUser.readAllUser)
router.post('/login', controllerUser.login)
router.post('/googleLogin', controllerUser.googleLogin)


module.exports = router