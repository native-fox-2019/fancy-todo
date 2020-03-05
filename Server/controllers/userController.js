const createError = require('../helpers/createErrors')
const jwt = require('../helpers/jwt')
const { User } = require('../models')
const bcrypt = require('../helpers/bcrypt')

class UserController {
    static register(req, res, next) {
        let obj = {
            email: req.body.email,
            password: req.body.password
        }

        User.create(obj)
            .then(data => {
                res.status(201).json(data)
            }).catch(err => {
                next(err)
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
}
module.exports = UserController