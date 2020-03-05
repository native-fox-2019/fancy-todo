const Model = require('../models')
const User = Model.User
const jwt = require('jsonwebtoken')
const { OAuth2Client } = require('google-auth-library');
const client = new OAuth2Client(process.env.CLIENT_ID);

class UserController {
    static register(req, res, next) {
        let obj = {
            email: req.body.email,
            password: req.body.password
        }
        User.create(obj)
            .then(user => {
                res.status(201).json(user)
            })
            .catch(err => {
                next(err)
            })
    }

    static login(req, res, next) {
        let email = req.body.email
        let password = req.body.password
        User.findOne({ where: { email: email } })
            .then(user => {
                if (user.password === password) {
                    let token = jwt.sign({ id: user.id, email: user.email }, process.env.SECRET)
                    res.status(200).json(token)
                } else if (user === null || user.password !== password) {
                    next({
                        status: 400,
                        resource: 'id/password'
                    })
                }
            })
            .catch(err => {
                next(err)
            })
    }

    static googleSignIn(req, res, next) {
        let token = req.body.token
        let email = null
        client.verifyIdToken({
                idToken: token,
                audience: process.env.CLIENT_ID,
            })
            .then(data => {
                if (data) {
                    email = data.payload.email
                    return User.findOne({ where: { email: email } })
                }
            })
            .then(dataUser => {
                if (dataUser === null) {
                    console.log('masuk akun belum terdaftar')
                    let obj = {
                        email: email,
                        password: 'Ahdy75hugg8765HJdh'
                    }
                    return User.create(obj)
                } else {
                    console.log('masuk akun terdaftar')
                    return dataUser
                }
            })
            .then(user => {
                console.log('masuk .then akun terdaftar sama kaga')
                let token = jwt.sign({
                        id: user.id,
                        email: user.email
                    },
                    process.env.SECRET)
                res.status(200).json(token)
            })
            .catch(err => {
                next(err)
            })
    }


}

module.exports = UserController