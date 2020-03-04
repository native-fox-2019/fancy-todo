const Model = require('../models')
const User = Model.User
const jwt = require('jsonwebtoken')

class UserController {
    static register(req, res, next){
        let obj = {
            email : req.body.email,
            password : req.body.password
        }
        User.create(obj)
        .then(user =>{
            res.status(201).json(user)
        })
        .catch(err =>{
            next(err)
        })
    }

    static login(req, res, next){
        let email = req.body.email
        let password = req.body.password
        User.findOne({where : {email : email}})
        .then(user =>{
            if(user.password === password){
                let token = jwt.sign({id: user.id, email : user.email}, process.env.SECRET)
                res.status(200).json(token)
            } else if(user === null || user.password !== password){
                next({
                    status : 400,
                    resource : 'id/password'
                })
            }
        })
        .catch(err =>{
            next(err)
        })
    }

}

module.exports = UserController