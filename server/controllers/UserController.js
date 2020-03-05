const { User } = require('../models')
const jwt = require('jsonwebtoken')
const {OAuth2Client} = require('google-auth-library');
// const client = new OAuth2Client(process.env.CLIENT_ID,'tLWdeJVWz43GxDa6zCYywINU',"urn:ietf:wg:oauth:2.0:oob")
const { google } = require('googleapis')
const client = new google.auth.OAuth2(process.env.CLIENT_ID,'tLWdeJVWz43GxDa6zCYywINU',"http://localhost:3000")

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
                const scopes = ['https://www.googleapis.com/auth/calendar']
                const url = client.generateAuthUrl({
                    access_type: 'offline',
                    scope: scopes
                })
                res.status(200).json({newToken, url})
            })
            .catch(err => {
                next(err)
            })
    }

    static getCode = (req, res, next) => {
        res.status(200).json(req.query.code)
        // client.getToken(req.query.code, (err, token) => {
        //     res.redirect('http://localhost:8080')
        // })
    }

}

module.exports = { UserController, client }