"use strict"
const { Todo } = require('../models')

const authorization = (req, res, next) => {
    const UserId = +req.user.id
    Todo.findOne({ where: { UserId: UserId } })
        .then(data => {
            if (!data) {
                res.status(404).json({ message: 'Data not found' })
            } else if (data.UserId === UserId) {
                next()
            } else {

            }
        })
        .catch(err => {
            next(err)
        })
}

module.exports = authorization
