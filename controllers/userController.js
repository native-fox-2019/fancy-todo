const Model = require(`../models`)
var createError = require('../helpers/createErrors')
var jwt = require(`../helpers/jwt`)

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
                                throw createError(400, `Wrong Email / Password`)
                            } else {
                                var token = jwt.jwtSign(data.id)

                                res.status(200).json({
                                    token
                                })
                            }
                        })
                } else {
                    throw createError(404, `Wrong Email / Password`)
                }
            })
            .catch(err => {
                next(err)
            })
    }
}

module.exports = User