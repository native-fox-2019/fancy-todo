const router = require('express').Router()
const ProjectController = require('../controllers/ProjectController')
const authentication = require('../middlewares/authentication')
const {todoAuthorization, projectAuthorization} = require('../middlewares/authorization')

router.post('/', authentication , ProjectController.create)
router.get('/', authentication, ProjectController.showProjects)
router.get('/:id/todos', authentication, projectAuthorization, ProjectController.showProjectTodos)
router.post('/:id/todos', authentication, projectAuthorization, ProjectController.addTodo)
// router.get('/:id/members', authentication, projectAuthorization, ProjectController.findMembersById)

module.exports = router