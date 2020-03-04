const router = require(`express`).Router()
const TodoRoute = require(`../routes/todoRouter`)
const Register = require(`../routes/registerRouter`)
const Login = require(`../routes/loginRouter`)
const User = require(`../routes/userRoute`)

router.use(`/login`, Login)
router.use(`/todos`, TodoRoute)
router.use(`/register`, Register)
router.use(`/googleSign`, User)


module.exports = router