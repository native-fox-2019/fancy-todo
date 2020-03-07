const router = require('express').Router()
const ProjectController = require('../controllers/ProjectController')
const authentication = require('../middlewares/authentication')
const {todoAuthorization, projectAuthorization} = require('../middlewares/authorization')

router.post('/', authentication , ProjectController.create)
router.get('/', authentication, ProjectController.showProjects)
router.post('/:id/members', authentication, projectAuthorization, ProjectController.addMember)
router.get('/:id/todos', authentication, projectAuthorization, ProjectController.showProjectTodos)
router.post('/:id/todos', authentication, projectAuthorization, ProjectController.addTodo)
router.put('/:projectId/todos/:todoId', authentication, projectAuthorization, ProjectController.updateTodo)
router.put('/:projectId/todos/:todoId', authentication, projectAuthorization, ProjectController.deleteTodo)
// router.get('/:id/members', authentication, projectAuthorization, ProjectController.findMembersById)

module.exports = router