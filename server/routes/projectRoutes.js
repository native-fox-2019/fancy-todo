const router = require('express').Router()
const ProjectController = require('../controllers/ProjectController')
const authentication = require('../middlewares/authentication')
const {todoAuthorization, projectAuthorization} = require('../middlewares/authorization')

router.post('/', authentication , ProjectController.create)
router.get('/:id/members', authentication, projectAuthorization, ProjectController.findMembersById)

module.exports = router