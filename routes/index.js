const router = require(`express`).Router()
const TodoRoute = require(`../routes/todoRouter`)
const errorHandler = require (`../middleware/errorHandler`)

router.use(`/todos`, TodoRoute)
router.use(`/todos`, errorHandler)


module.exports = router