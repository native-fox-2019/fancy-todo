const { User } = require('../models')

class UserController {
    static register = (req, res) => {
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
                res.status(500).json(err)
            })
    }

    static signIn = (req, res) => {
        let { email, password } = req.body
        User.findOne({
            where: {
                email,
                password
            }
        })
    }
}

module.exports = UserController