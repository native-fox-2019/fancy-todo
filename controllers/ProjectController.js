const { Project, ProjectUser, User } = require('../models')

class ProjectController {
    static create = (req, res, next) => {
        let { name } = req.body
        let newProject = {
            name
        }

        Project.create(newProject)
            .then(() => {
                return Project.findOne({ where: { name } })
            })
            .then(project => {
                let ProjectId = project.id
                let UserId = req.userData.id
                let newProjectUser = {
                    ProjectId,
                    UserId
                }
                return ProjectUser.create(newProjectUser)
            })
            .then(() => {
                res.status(201).json(newProject)
            })
            .catch(err => {
                next(err)
            })
    }

    static findMembersById = (req, res, next) => {
        let id = req.params.id
        Project.findByPk(id, {
            include: [User]
        })
            .then(project => {
                res.status(200).json(project.Users)
            })
    }
}

module.exports = ProjectController