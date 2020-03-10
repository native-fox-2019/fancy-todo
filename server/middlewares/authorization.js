const { todo } = require('../models')

function authorizationUser(req, res, next) {
    let id = req.params.id
    todo.findOne({
        where: {
            id: id
        }
    })
    .then(data=>{
        if(data.userId === req.userData.id){
            next()
        }else{
            throw new Error("User not authorized")
        }
    })
    .catch((err) => {
        res.status(400).json({
            status: 400,
            message: err.message
        })
    })
}

module.exports = authorizationUser