const { User } = require('../models')
const makeToken = require('../helpers/makeToken')
const comparePassword = require('../helpers/comparePassword')

class UserController {
    static register(req, res, next) {
        let { first_name, last_name, email, password } = req.body;
        User.create({
            first_name, last_name, email, password
        })
        .then(result => {
            res.status(201).json(result)
        })
        .catch(err=> {
            if(err.errors){
                let error = []
                err.errors.forEach((item) => {
                    error.push ({
                        type: item.type,
                        msg: item.message
                    })
                })
                next({status: 400, error})
                res.status(400).json(error)
            }else{
                res.tatus(500)
            }
        })
    }
    static login(req, res, next){
        let { email, password } = req.body;
        User.findOne({where: {email}})
        .then(user => {
            if(user){
                return comparePassword(password, user.password)
                .then(function(result) {
                    if(result){
                        let token = makeToken(user)
                        res.status(200).json({token}) 
                    }else{
                        throw {status: 400, msg: 'wrong password'}
                    }
                });    
            }else{
                throw {status: 404, msg: 'wrong email'}
            }
        })
        .catch(err => {
            next(err)
        })
    }
}

module.exports = UserController