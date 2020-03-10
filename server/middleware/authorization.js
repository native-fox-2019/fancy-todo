"use strict"
const { Todo } = require('../models')

const authorization = (req, res, next) => {
    const UserId = +req.user.id
    const id = +req.params.id
    Todo.findOne({ where: { id } })
        .then(data => {
            if (!data) {
                res.status(404).json({ message: 'Data not found' })
            } else if (data.UserId === UserId) {
                next()
            } else {
                const error = {
                    status : 404,
                    message : 'Data not found'
                }
                throw(error)
            }
        })
        .catch(err => {
            next(err)
        })
}

module.exports = authorization
