const { User } = require(`../models`)
const { hashPassword } = require(`../helper/bcrypt`)

class RegisterController {
    static register (req, res, next) {
        let newRegister = {
            name: req.body.name,
            email: req.body.email,
            password: req.body.password
        }

        User.create(newRegister)
        .then(data => {
            res.status(201).json(newRegister)
        })
        .catch(err => {
            next(err)
        })
    }
}

module.exports = RegisterController