var express = require('express')
var router = express.Router()

const { user } = require(`../controllers`)

router.post(`/register`, user.create)

router.post(`/login`, user.login)

module.exports = router