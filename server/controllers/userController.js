"use strict"
const { User } = require('../models')
const { comparePass } = require('../helpers/passwordGeneral')
const sendEmail = require('../helpers/sendMailAPI')
const generateToken = require('../helpers/generateToken')
const { OAuth2Client } = require('google-auth-library');
const client = new OAuth2Client(process.env.CLIENT_ID);

class UserController {
    static register(req, res, next) {
        const { username, email, password } = req.body
        User.create({ username, email, password })
            .then(data => {
                const name = data.username
                const email = data.email
                res.status(201).json(data)
                sendEmail(name, email)
            })
            .catch(err => {
                next(err)
            })
    }

    static login(req, res, next) {
        const { email, password } = req.body
        User.findOne({ where: { email: email } })
            .then(data => {
                if (comparePass(password, data.password)) {
                    res.status(200).json({ token: generateToken(data.id, data.username) })
                } else {
                    throw (error)
                }
            })
            .catch(err => {
                const error = {
                    msg: 'wrong email / password',
                    status: 404
                }
                if (err) {
                    next(error)
                }
            })
    }

    static googleLogin(req, res, next) {
        const token = req.body.token
        async function verify() {
            const ticket = await client.verifyIdToken({
                idToken: token,
                audience: process.env.CLIENT_ID,
            });
            const payload = ticket.getPayload();
            User.findOne({ where: { email: payload.email } })
                .then(data => {
                    if (data === null) {
                        User.create({ email: payload.email, password: '12345qwerty', username: payload.name })
                            .then(data => {
                                res.status(201).json({ token: generateToken(data.id, data.username) })
                            })
                    } else {
                        res.status(200).json({ token: generateToken(data.id, data.username) })
                    }
                })
                .catch(err => {
                    next(err)
                })

        }
        verify().catch(console.error);


    }

}

module.exports = UserController