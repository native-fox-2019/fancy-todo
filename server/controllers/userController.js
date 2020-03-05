"use strict"
const { User } = require('../models')
const { comparePass } = require('../helpers/passwordGeneral')
const generateToken = require('../helpers/generateToken')

class UserController {
    static register(req, res, next) {
        const { username, email, password } = req.body
        User.findOne({ where: { username } })
            .then(data => {
                if (data === null) {
                    return User.create({ username, email, password })
                } else {
                    res.status(400).json('username has been use by other user!')
                }
            })
            .then(data => {
                res.status(201).json(data)
            })
            .catch(err => {
                next(err)
            })
    }

    static login(req, res, next) {
        console.log('croooooooottttttt')
        const { username, password } = req.body
        User.findOne({ where: { username: username } })
            .then(data => {
                if (comparePass(password, data.password)) {
                    res.status(200).json({ token: generateToken(data.id, data.username) })
                } else {
                    throw (error)
                }
            })
            .catch(err => {
                const error = {
                    msg: 'wrong username / password',
                    status: 404
                }
                if (err) {
                    next(error)
                }
            })
    }

}

module.exports = UserController