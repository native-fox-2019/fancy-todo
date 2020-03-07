const { Todo, ProjectUser } = require('../models')

const todoAuthorization = (req, res, next) => {
    let todoId = req.params.id
    let { id, email } = req.userData
    Todo.findOne({ where: { id: todoId } })
        .then(todo => {
            if (todo === null) {
                next(
                    {
                        status: 404,
                        msg: 'Todo not found'
                    }
                )
            }
            if (todo.UserId === id) {
                next()
            } else {
                next(
                    {
                        status: 403,
                        msg: 'You are not authorized'
                    }
                )
            }
        })
        .catch(err => {
            next(err)
        })
}

const projectAuthorization = (req, res, next) => {
    let ProjectId
    if (req.params.id) {
        ProjectId = req.params.id
    } else if (req.params.projectId) {
        ProjectId = req.params.projectId
    }
    let UserId = req.userData.id
    ProjectUser.findOne({ where: { ProjectId, UserId } })
        .then(projectUser => {
            if (projectUser) {
                next()
            } else {
                next(
                    {
                        status: 403,
                        msg: 'You are not authorized'
                    }
                )
            }
        })
        .catch(err => {
            next(err)
        })
}


module.exports = { todoAuthorization, projectAuthorization }