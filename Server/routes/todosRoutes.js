const router = require('express').Router()
const todoController = require('../controllers/todoController')
const authorization = require('../middlewares/authorization')

router.post(``, todoController.add)
router.get(``, todoController.showAll)
router.get(`/:id`, authorization,todoController.showOne)
router.delete(`/:id`, authorization,todoController.delete)
router.put(`/:id`, authorization,todoController.edit)

module.exports=router
