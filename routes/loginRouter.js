const { User } = require(`../models`)
const router = require(`express`).Router()
const LoginController = require(`../controllers/loginController`)

router.post(`/`, LoginController.doLogin)

module.exports = router