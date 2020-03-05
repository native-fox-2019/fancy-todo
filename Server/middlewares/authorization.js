const jwt = require('jsonwebtoken')
const { Todo } = require('../models')

module.exports = (req, res, next) => {
    let { token } = req.headers
    let id = {
        where: {
            id: req.params.id
        }
    }
    try {
        Todo.findOne(id)
        .then(data =>{
            if(req.userData.id === data.UserId){
                console.log("masuk bener")
            next()
            } 
        })
    } catch (err) {
        console.log("masuk salah")
        next(err)
    }
}
