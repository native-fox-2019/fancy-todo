const express = require('express')
const router = express.Router()
const controller = require('../controller/todoController.js')
const authentication = require('../middleware/authentication.js')
const authorization = require('../middleware/authorization.js')


router.use(authentication)
router.get('/',controller.view)
router.post('/',controller.add)
router.get('/quotes',controller.getQuotes)
router.get('/check/weather', controller.getWeather)
router.get('/:id',authorization,controller.getTodo)
router.put('/:id',authorization,controller.update)
router.delete('/:id',authorization,controller.delete)

module.exports = router