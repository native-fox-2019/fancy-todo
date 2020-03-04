const { User } = require(`../models`)

class RegisterController {
    static register (req, res, next) {
        let newRegister = {
            name: req.body.name,
            email: req.body.email,
            password: req.body.password
        }

        User.create(newRegister)
        .then(data => {
            let show = { //data brought to user side
                name: data.name,
                email: data.email
            }
            res.status(201).json(show)
        })
        .catch(err => {
            next(err)
        })
    }
}

module.exports = RegisterController