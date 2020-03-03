const { Todo } = require('../models');

function authorization(req, res, next) {
    let todoId = { id: req.params.id };
    try {
        Todo.findOne({ where: todoId })
        .then(data => {
            if (data) {
                if (req.userData.id === data.UserId) {
                    next();
                } else {
                    res.status(403).json({ status: 403, message: 'specified record belongs to someone else!' });
                }
            } else {
                //// ERROR HANDLING NEEDED
                // next(err)
                // if err.name ==
                // err.messa
                res.status(404).json({ status: 404, message: 'specified record not found!' });
            }
            console.log(data)
        })
    } catch (err) {
        next(err);
    }
}

module.exports = authorization;