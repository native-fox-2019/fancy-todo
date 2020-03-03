var express = require('express')
var router = express.Router()

const { user } = require(`../controllers`)

router.post(`/register`, user.create)

module.exports = router