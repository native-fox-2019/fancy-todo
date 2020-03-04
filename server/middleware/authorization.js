const jwt = require(`jsonwebtoken`)
const { Todo } = require(`../models`)

function authorization (req, res, next) {
    let todoId = req.params.id
    Todo.findOne({where:{id:todoId}})
    .then(data => {
        if (data == null) {
            next({
                status:404,
                msg:`Cannot be found`
            })
        } else {
            if (data.user_id == req.userData.id) {
                next()
            } else {
                next({
                    status:400,
                    msg:`You are not authorized`
                })
            }
        }
    })
    .catch(err => {
        next(err)
    })

}

module.exports = authorization