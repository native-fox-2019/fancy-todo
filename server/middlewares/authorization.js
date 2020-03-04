const { Todo } = require('../models');
const createError = require('../helpers/createError');

function authorization(req, res, next) {
    let id = Number(req.params.id);
    Todo.findOne({ where: { id } })
        .then(data => {
            if (!data) {
                throw createError(404, 'Error Not Found');
            } else {
                if (data.UserId === req.userData.id) {
                    next();
                } else {
                    throw createError(403, 'Forbidden');
                }
            }
        }).catch(err => {
            next(err);
        });
}

module.exports = authorization;