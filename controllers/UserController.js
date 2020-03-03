const { User } = require('../models')
const jwt = require('jsonwebtoken')

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
}

module.exports = UserController