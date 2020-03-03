const router = require(`express`).Router()
const TodoRoute = require(`../routes/todoRouter`)
// const errorHandler = require (`../middleware/errorHandler`)
const Register = require(`../routes/registerRouter`)
const Login = require(`../routes/loginRouter`)

router.use(`/login`, Login)
router.use(`/todos`, TodoRoute)
router.use(`/register`, Register)


module.exports = router