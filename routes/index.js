const router = require(`express`).Router()
const TodoRoute = require(`../routes/todoRouter`)

router.use(`/todos`, TodoRoute)


module.exports = router