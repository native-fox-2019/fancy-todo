const { User } = require('../models')
const bcrypt = require('bcryptjs')
const jwt = require('jsonwebtoken')

class UserController {
    static registerUser(req, res, next) {
        let { name, email, password } = req.body
        User.create({
            name,
            email,
            password
        })
            .then(user => {
                res.status(201).json(user)
            })
            .catch(err => {
                res.status(500).json(err)
            })
    }

    static loginUser(req, res, next) {
        let { email, password } = req.body
        User.findOne({ where: { email } })
            .then(user => {
                if (user) {
                    if (bcrypt.compareSync(password, user.password)) {
                        let token = jwt.sign({ email: user.email }, process.env.JWT_SECRET);
                        res.status(200).json({ token })
                    } else {
                        res.status(400).json({
                            status: 400,
                            msg: `wrong email or password`
                        })
                    }
                } else {
                    res.status(400).json({
                        status: 400,
                        msg: `wrong email or password`
                    })
                }
            })
            .catch(err => {
                res.status(500).json(err)
            })
    }

}



module.exports = UserController