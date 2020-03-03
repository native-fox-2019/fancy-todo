const { Todo } = require('../models')

const authorization = (req, res, next) => {
    let todoId = req.params.id
    let { id, email } = req.userData
    Todo.findOne({ where: { id: todoId } })
        .then(todo => {
            if (todo.UserId === id) {
                next()
            } else {
                next(
                    {
                        status: 400,
                        msg: 'You are not authorized'
                    }
                )
            }
        })
        .catch(err => {
            next(err)
        })
}

module.exports = authorization