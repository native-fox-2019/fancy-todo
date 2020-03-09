const { User } = require('../models')
const bcrypt = require('bcryptjs')
const jwt = require('jsonwebtoken')
const { OAuth2Client } = require('google-auth-library')

class UserController {
    static registerUser(req, res, next) {
        let { name, email, password } = req.body
        User.create({
            name,
            email,
            password
        })
            .then(user => {
                res.status(201).json(user)
            })
            .catch(err => {
                res.status(500).json(err)
            })
    }

    static loginUser(req, res, next) {
        let { email, password } = req.body
        User.findOne({ where: { email } })
            .then(user => {
                if (user) {
                    if (bcrypt.compareSync(password, user.password)) {
                        let token = jwt.sign({ id: user.id, email: user.email }, process.env.JWT_SECRET);
                        res.status(200).json({ token })
                    } else {
                        res.status(400).json({
                            status: 400,
                            msg: `wrong email or password`
                        })
                    }
                } else {
                    res.status(400).json({
                        status: 400,
                        msg: `wrong email or password`
                    })
                }
            })
            .catch(err => {
                res.status(500).json(err)
            })
    }

    static googleLoginUser(req, res, next) {

        const client = new OAuth2Client(process.env.GOOGLE_SIGN_KEY)
        client.verifyIdToken({
            idToken: req.body.token,
            audience: process.env.GOOGLE_SIGN_KEY,
        })
            .then(ticket => {
                let payload = ticket.getPayload()
                return User.findOne({
                    where: {
                        email: payload.email
                    }
                })
                    .then(data => {
                        if (data) {
                            return data

                        } else {
                            return User.create({
                                username: payload.given_name,
                                email: payload.email,
                                password: "12345"
                            })
                        }
                    })
                    .then(user => {
                        let token = jwt.sign({ id: user.id, email: user.email }, process.env.JWT_SECRET)
                        res.status(200).json({ token })
                    })
                    .catch(err => {
                        next(err)
                    })
            })

            .catch(err =>{
                next(err)
            })
    }

}





module.exports = UserController