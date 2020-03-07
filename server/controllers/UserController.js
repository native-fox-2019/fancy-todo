const { User } = require('../models')
const jwt = require('jsonwebtoken')
// const {OAuth2Client} = require('google-auth-library');
// const client = new OAuth2Client(process.env.CLIENT_ID,'tLWdeJVWz43GxDa6zCYywINU',"urn:ietf:wg:oauth:2.0:oob")
const { google } = require('googleapis')
const client = new google.auth.OAuth2(process.env.CLIENT_ID,process.env.CLIENT_SECRET,"http://localhost:3000")

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
                let msg = []
                err.errors.forEach(error => {
                    msg.push(error.message)
                })
                next(
                    {
                        status: 400,
                        msg: msg
                    }
                )
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
                                msg: 'Wrong Email / Password'
                            }
                        )
                    }
                } else {
                    next(
                        {
                            status:400,
                            msg: 'Wrong Email / Password'
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
                let token = jwt.sign({ id, email }, process.env.JWT_SECRET)
                res.status(200).json(token)
            })
            .catch(err => {
                next(err)
            })
    }

}

module.exports = UserController