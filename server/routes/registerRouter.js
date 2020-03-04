const router = require(`express`).Router()
const RegisterController = require(`../controllers/registerController`)

router.post(`/`, RegisterController.register)

module.exports = router