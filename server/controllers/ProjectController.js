const { Project, ProjectUser, User , Todo} = require('../models')

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

    static showProjects = (req, res, next) => {
        let id = req.userData.id
        User.findByPk(id, { include: [ Project ] })
            .then(user => {
                res.status(200).json(user.Projects)
            })
            .catch(err => {
                next(err)
            })
    }

    static showProjectTodos = (req, res, next) => {
        let UserId = req.userData.id
        let ProjectId = req.params.id
        Project.findByPk(ProjectId, { include: [ Todo ] })
            .then(project => {
                res.status(200).json(project.Todos)
            })
            .catch(err => {
                next(err)
            })
    }

    static addTodo = (req, res, next) => {
        let { title, description, status, due_date } = req.body
        let projectId = Number(req.params.id)
        let userId = req.userData.id
        let newTodo = {
            title,
            description,
            status,
            due_date,
            UserId: userId,
            ProjectId: projectId
        }
        Todo.create(newTodo)
            .then(todo => {
                res.status(201).json({ msg: `New todo has been created`, newTodo })
            })
            .catch(err => {
                if (err.errors) {
                    let msg = []
                    err.errors.forEach(error => {
                        msg.push(error.message)
                    })
                    next(
                        {
                            status: 400,
                            msg: msg
                        }
                    )
                } else {
                    next(err)
                }
            })
    }

    static addMember = (req, res, next) => {
        
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