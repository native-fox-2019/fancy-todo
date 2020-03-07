const {User} = require('../models')
const createError = require('http-errors')
const {generateToken} = require('../helpers/generateToken')
const { comparePassword } = require('../helpers/comparePassword')
const {OAuth2Client} = require('google-auth-library');
const client = new OAuth2Client('831032422222-1vo1hs36kr7vtu6vajsialdf5bb57ms9.apps.googleusercontent.com');
const fs = require('fs');
const readline = require('readline');
const { google } = require('googleapis');
const sendMail = require('../helpers/mailgun')
class Controller{
    static register(req, res, next) {
        const {email, password, name} = req.body
        User
        .findOne({
            where:{
                email:email,
            }
        })
        .then(data =>{
            if(data){
                throw createError(409, 'Email already register')
            } else {
                return User.create({
                    email,
                    password,
                    name
                })
            }
        })
        .then(data =>{
            res.status(200).json(data)
        })
        .catch(err =>{
            next(err)
        })
    }
    
    static login(req, res, next){
        const { email, password } = req.body
        User
        .findOne({
            where:{email:email}
        })
        .then(data =>{
        // console.log(data)
            if (!data) {
                throw createError(404, 'User Not Found') 
            } else {
                if (comparePassword(password, data.password)) {
                    const payload = {
                        id: data.id,
                        email:data.email
                    }
                    const token = generateToken(payload)
                    res.status(200).json({
                        token: token,
                        name: data.name
                    })
                }else{
                    throw createError(401, 'Invalid Email or Password')
                }
            }
        })
            .catch(err => {
            // console.log(err)
            next(err)
        })
    }
    static loginGoogle(req, res, next) {
        client.verifyIdToken({
            idToken: req.body.id_token,
            audience: '831032422222-1vo1hs36kr7vtu6vajsialdf5bb57ms9.apps.googleusercontent.com'
        })
        .then(ticket =>{
            return ticket.getPayload()
        })
        .then(payload =>{
            return User
            .findOne({
                where: {email : payload.email}
            })
        })
        .then(data =>{
            if (data) {
                const payload = {
                    id: data.id,
                    email: data.email
                }
                const token = generateToken(payload)
                res.status(200).json({
                    token: token,
                    name: data.name
                })
            } else {
                let passGen = String(Math.floor(Math.random() * 100000))
                sendMail(payload, passGen)
                return User.create({
                        name: payload.name,
                        email: payload.email,
                        password: passGen
                    })
            }
        })
        .then(data => {
            const payload = {
                    id: data.id,
                    email: data.email
                }
                const token = generateToken(payload)
                res.status(200).json({
                    token: token,
                    name: data.name
                })
        })
        .catch(err =>{
            next(err)
        })
    }
}

module.exports = Controller
