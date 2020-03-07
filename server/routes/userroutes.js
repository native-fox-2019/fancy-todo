var express = require('express')
var router = express.Router()

const { user } = require(`../controllers`)

router.post(`/register`, user.create)

router.post(`/login`, user.login)

router.post(`/googleSignIn`, user.googleSignin)

module.exports = router