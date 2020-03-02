const router = require('express').Router()
const todoController = require('../controllers/todoController')

router.post(``, todoController.add)
router.get(``, todoController.showAll)
router.get(`/:id`, todoController.showOne)
router.delete(`/:id`, todoController.delete)
router.put(`/:id`, todoController.edit)

module.exports=router
