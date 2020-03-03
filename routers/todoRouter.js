"use strict"

const express = require('express')
const router = express.Router()

const Controller = require('../controllers/todoController.js')
const authentication = require('../middlewares/authentication.js')
const authorization = require('../middlewares/authorization.js')

// router.post('/', Controller.add)
// router.get('/', Controller.viewAll)

// router.get('/:id', Controller.viewOne)
// router.put('/:id', Controller.edit)
// router.delete('/:id', Controller.delete)

//////////

router.post('/', authentication, Controller.add)
router.get('/', authentication, Controller.viewAll)

router.get('/:id', authentication, authorization, Controller.viewOne)
router.put('/:id', authentication, authorization, Controller.edit)
router.delete('/:id', authentication, authorization, Controller.delete)

module.exports = router