const router = require(`express`).Router()
const TodoRoute = require(`../routes/todoRouter`)
const errorHandler = require (`../middleware/errorHandler`)
const Register = require(`../routes/registerRouter`)
const Login = require(`../routes/loginRouter`)

router.use(`/todos`, TodoRoute)
router.use(`/todos`, errorHandler)
router.use(`/register`, Register)
router.use(`/register`, errorHandler)
router.use(`/login`, Login)
router.use(`/login`, errorHandler)


module.exports = router