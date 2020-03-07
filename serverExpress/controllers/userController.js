const { User } = require('../models')
const makeToken = require('../helpers/makeToken')
const comparePassword = require('../helpers/comparePassword')
const {OAuth2Client} = require('google-auth-library');
const checkEmail = require('../helpers/checkEmail')

class UserController {
    static register(req, res, next) {
        let { first_name, last_name, email, password } = req.body;
        checkEmail(email)
        .then(response => {
            if(!response.data.format_valid){
                throw ({status: 400, msg: 'Invalid format'})
            }else if(response.data.did_you_mean){
                throw ({status: 400, msg: `Do you mean your email is ${response.data.did_you_mean}?`})
            }else if(!response.data.smtp_check){
                throw ({status: 400, msg: 'Email not Found'})
            }else{
                return User.findOne({where: {email}})
            }
        })
        .then((data) => {
            if(data){
                throw ({status: 400, msg:'Email has been used'})
            }else{
                return User.create({
                    first_name, last_name, email, password
                })
            }
        })
        .then(result => {
            res.status(201).json(result)
        })
        .catch(err=> {
            if(err.errors){
                let error = []
                err.errors.forEach((item) => {
                    error.push ({
                        path: item.path,
                        type: item.type,
                        msg: item.message
                    })
                })
                next({status: 400, error})
            }else{
                next(err)
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
    static googleLogin(req, res, next){
        const client = new OAuth2Client(process.env.CLIENT_ID);
        let id_token = req.body.id_token
        let user = {}
        client.verifyIdToken({
            idToken: id_token,
            audience: process.env.CLIENT_ID
        })
        .then(ticket => {
            const payload = ticket.getPayload();
            user = {
                first_name : payload.given_name,
                last_name : payload.family_name,
                email: payload.email,
                password: 'default'
            }
            return User.findOne({where: {email: user.email}})
        })
        .then(userdata => {
            if(userdata){
                let token = makeToken(userdata)
                res.status(200).json({token}) 
            }else{
                return User.create(user)
            }
        })
        .then(result => {
            let token = makeToken(result)
            res.status(200).json({token}) 
        })
        .catch(err => {
            if(err){
                next(err)
            }
            next({status: 400, msg: 'Failed'})
        })
    }
}

module.exports = UserController