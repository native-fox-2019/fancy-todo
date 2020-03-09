const express = require('express');
const router = express.Router();
const Controller = require("../controllers/todo");
const authentication = require('../middlewares/authentication')

router.use(authentication)
router.get('/', Controller.findAll)
router.get('/:id', Controller.findOne)
router.post('/', Controller.create)
router.put('/:id', Controller.update)
router.patch('/:id', Controller.updateStatus)
router.delete('/:id', Controller.destroy)

module.exports = router