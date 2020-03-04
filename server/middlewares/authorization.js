const { Todo, ProjectUser } = require('../models')

const todoAuthorization = (req, res, next) => {
    let todoId = req.params.id
    let { id, email } = req.userData
    console.log(todoId, id)
    Todo.findOne({ where: { id: todoId } })
        .then(todo => {
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
    let ProjectId = req.params.id
    let UserId = req.userData.id
    ProjectUser.findOne({ where: { ProjectId } })
        .then(projectUser => {
            if (projectUser.UserId === UserId) {
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