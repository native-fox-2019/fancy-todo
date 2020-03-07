const createError = require('../helpers/createErrors')
const jwt = require('../helpers/jwt')
const { User } = require('../models')
const bcrypt = require('../helpers/bcrypt')
const { OAuth2Client } = require('google-auth-library');
const client = new OAuth2Client(process.env.CLIENT);

class UserController {
    static register(req, res, next) {
        let obj = {
            email: req.body.email,
            password: req.body.password
        }

        User.create(obj)
            .then(data => {
                res.status(200).json({
                    token: UserController.autoLogin(data.email)
                })
            })
            .catch(err => {
                next(err)
            })
    }

    static autoLogin(email) {
        User.findOne({
            where: {
                email
            }
        })
            .then(data => {
                let token = jwt.jwtSign(data.id)

                return token
            })
            .catch(err => {
                throw err
            })
    }

    static login(req, res, next) {
        let obj = {
            email: req.body.email,
            password: req.body.password
        }
        let email = {
            where: {
                email: obj.email
            }
        }
        User.findOne(email)
            .then(data => {
                if (data) {
                    let result = bcrypt.checker(obj.password, data.password)

                    if (result == false) {
                        throw createError(400, 'Email / Password is not valid')
                    } else {
                        let token = jwt.jwtSign(data.id)

                        res.status(200).json({
                            token
                        })
                    }
                } else {
                    throw createError(404, 'Email / Password is not valid')
                }

            }).catch(err => {
                next(err)
            })
    }

    static googleLogin(req, res, next) {
        client.verifyIdToken({
            idToken: req.body.id_token,
            audience: process.env.CLIENT,  // Specify the CLIENT_ID of the app that accesses the backend
            // Or, if multiple clients access the backend:
            //[CLIENT_ID_1, CLIENT_ID_2, CLIENT_ID_3]
        }).then(ticket => {
            const payload = ticket.getPayload();
            User.findOne({
                where: {
                    email: payload.email
                }
            })
                .then(data => {
                    if (data) {
                        return data
                    }
                    else {
                        let obj = {
                            email: payload.email,
                            password: "apapun"
                        }
                        return User.create(obj)
                    }
                })
                .then(data => {
                    // console.log(data)
                    if (data) {
                        var token = jwt.jwtSign(data.id)
                    }
                    res.status(200).json({ token: token })
                })
                .catch(err => {
                    next(err)
                })
        })


    }
}
module.exports = UserController