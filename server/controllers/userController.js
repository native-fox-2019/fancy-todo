const Model = require(`../models`)
const createError = require('../helpers/createErrors')
const jwt = require(`../helpers/jwt`)
const bcrypt = require(`../helpers/bcrypt`)

class User {
    static create(req, res, next) {
        var { email, password } = req.body

        var newUser = {
            email,
            password
        }

        Model.User.create(newUser)
            .then(data => {
                var token = jwt.jwtSign(data.id)
                
                res.status(201).json({
                    token
                })
            })
            .catch(next)
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
                    var result = bcrypt.compare(password, data.password)

                    if (result) {
                        var token = jwt.jwtSign(data.id)

                        res.status(200).json({
                            token
                        })
                    } else {
                        throw createError(400, `Wrong Email / Password`)
                    }

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