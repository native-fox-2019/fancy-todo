const { Todo } = require('../models');
const createError = require('http-errors');

function authorization(req, res, next) {
    let todoId = { id: req.params.id };
    try {
        Todo.findOne({ where: todoId })
        .then(data => {
            if (data) {
                if (req.userData.id === data.UserId) {
                    next();
                } else {
                    throw createError(403, 'ItemNotOwned');
                }
            } else {
                throw createError(404, 'ItemNotFound');
            }
            console.log(data)
        })
    } catch (err) {
        next(err);
    }
}

module.exports = authorization;