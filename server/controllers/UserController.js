const { User } = require('../models')
const jwt = require('jsonwebtoken')
const {OAuth2Client} = require('google-auth-library');
const client = new OAuth2Client(process.env.CLIENT_ID)

class UserController {
    static register = (req, res, next) => {
        let { first_name, last_name, email, password } = req.body
        let newUser = {
            first_name,
            last_name,
            email,
            password
        }

        User.create(newUser)
            .then(user => {
                res.status(201).json(user)
            })
            .catch(err => {
                next(err)
            })
    }

    static login = (req, res, next) => {
        let { email, password } = req.body
        User.findOne({
            where: {
                email
            }
        })
            .then(user => {
                if (user) {
                    if (user.password === password) {
                        let id = user.id
                        let token = jwt.sign({ id, email }, process.env.JWT_SECRET)
                        res.status(200).json(token)
                    } else {
                        next(
                            {
                                status: 400,
                                msg: 'Wrong Password'
                            }
                        )
                    }
                } else {
                    next(
                        {
                            status:400,
                            msg: 'Wrong Email'
                        }
                    )
                }
            })
            .catch(err => {
                next(err)
            })
    }

    static glogin = (req, res, next) => {
        let { token } = req.body
        let payload
        client.verifyIdToken({
            idToken: token,
            audience: process.env.CLIENT_ID
        })
            .then(ticket => {
                payload = ticket.getPayload()
                return User.findOne({
                    where: {
                        email: payload.email
                    }
                })
            })
            .then(user => {
                if (user) {
                    return user
                } else {
                    let newUser = {
                        first_name: payload.given_name,
                        last_name: payload.family_name,
                        email: payload.email,
                        password: 'inirandombangetsumpah'
                    }
                    return User.create(newUser)
                }
            })
            .then(user => {
                let id = user.id
                let email = user.email
                let newToken = jwt.sign({ id, email }, process.env.JWT_SECRET)
                res.status(200).json(newToken)
            })
            .catch(err => {
                next(err)
            })
    }
}

module.exports = UserController