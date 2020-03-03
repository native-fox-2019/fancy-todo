const { User } = require('../models');
const jwt = require('jsonwebtoken');

class Controller{
    static register(req, res, next){
        let dataRegis = {
            email: req.body.email,
            password: req.body.password
        }

        User.create(dataRegis)
            .then(data=>{
                res.status(201).json(dataRegis);
            })
            .catch(err=>{
                next(err);
            })
    }

    static login(req, res, next){
        User.findOne({
            where: {
                email: req.body.email
            }
        })
            .then(user=>{
                if(req.body.password === user.password){
                    let token = jwt.sign({
                        id: user.id,
                        email: user.email
                    }, process.env.SECRET)

                    res.status(200).json(token);
                }else{
                    next({
                        msg: 'wrong password'
                    })
                }
            })
            .catch(err=>{
                next(err);
            })
    }
}

module.exports = Controller;