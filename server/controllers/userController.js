"use strict"

const { User } = require('../models')
const { checkPassword } = require('../helpers/bcryptjs.js')
const { generateToken } = require('../helpers/jwt.js')
const { OAuth2Client } = require('google-auth-library');
const client = new OAuth2Client("880828445755-hem0eh6nccer93hbfi0rjbkpjhtu5d8f.apps.googleusercontent.com");


class Controller {

    static register(req, res, next) {
        let { username, email, password } = req.body

        User.create({
            username,
            email,
            password
        })
            .then(user => {
                res.status(201).json(user)
            })
            .catch(err => {
                next(err)
            })
    }

    static login(req, res, next) {
        let obj = {
            email: req.body.email,
            password: req.body.password
        }
        let option = {
            where: { email: obj.email }
        }
        User.findOne(option)
            .then(user => {
                if (!user) throw { status: 400, message: 'Wrong email/password' }

                const passwordInput = obj.password
                const passwordUser = user.password
                let compare = checkPassword(passwordInput, passwordUser)

                if (!compare) throw { status: 400, message: 'Wrong email/password' }

                const payload = {
                    id: user.id,
                    username: user.username,
                }

                let token = generateToken(payload)
                res.status(200).json({ token })
            })
            .catch(err => {
                console.log(err)
                next(err)
            })
    }

    static googleLogin(req, res, next) {
        let email = null;
        client.verifyIdToken({
            idToken: req.body.token,
            audience: "880828445755-hem0eh6nccer93hbfi0rjbkpjhtu5d8f.apps.googleusercontent.com"
        })
        .then(ticket => {
            email = ticket.getPayload().email
            return User.findOne({ where: { email: email } })
        })
        .then(data => {
            if (data) {
                return data
            } else {
                return User.create({
                    username: email,
                    email: email,
                    password: "default"
                })
            }
        })
        .then(data => {
            // let token = jwt.sign({ id: data.id, email: data.email }, process.env.JWT_SECRET)
            const payload = {
                id: data.id,
                email: data.email,
            }
            let token = generateToken(payload)
            res.status(200).json({ token })
        })
        .catch(err => {
            next(err)
        })
    }
}

module.exports = Controller