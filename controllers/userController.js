const Model = require(`../models`)
var createError = require('http-errors')
const bcrypt = require('bcrypt');
var jwt = require('jsonwebtoken');

class User {
    static create(req, res, next) {
        var { email, password } = req.body
        var newUser = {
            email,
            password
        }

        Model.User.create(newUser)
            .then(data => {
                res.status(201).json(data)
            })
            .catch(err => {
                next(err)
            })
    }

    static login(req, res, next) {
        var { email, password } = req.body

        Model.User.findOne({
            where: {
                email
            }
        })
            .then(data => {
                if (data) {
                    bcrypt.compare(password, data.password)
                        .then(function (result) {
                            if (result === false) {
                                throw createError(400, `Wrong Password`)
                            } else {
                                var token = jwt.sign({ id: data.id }, process.env.JWT_SECRET);

                                res.status(200).json({
                                    token
                                })
                            }
                        })
                }
            })
            .catch(err => {
                next(err)
            })
    }
}

module.exports = User