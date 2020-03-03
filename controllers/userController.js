const { User } = require('../models');
require('dotenv').config();
const jwt = require('jsonwebtoken');

class UserController {
    static register = (req, res) => {
        let newUser = {
            email: req.body.email,
            password: req.body.password
        };
        User.create(newUser)
        .then(() => {
            return User.findOne({ 
                where: {
                    email: newUser.email,
                    password: newUser.password
                }
            });
        })
        .then(data => {
            res.status(201).json({
                status: 201,
                result: {
                    id: data.id,
                    email: data.email,
                    password: data.password
                }
            });
        })
        .catch(err => {
            if (err.errors) {
                res.status(400).json(err.errors[0]);
            } else {
                res.status(500).json(err);
            }
        })
    }

    static login = (req, res) => {
        let loginData = {
            email: req.body.email,
            password: req.body.password
        }
        User.findOne({ where: loginData })
        .then(data => {
            if (data) {
                let token = jwt.sign({ id: data.id, email: data.email }, process.env.AUTH_SECRET);
                res.status(200).json({ token });
            } else {
                res.status(400).json({ status: 400, message: 'wrong email / password!' });
            }
        })
        .catch(err => {
            res.status(500).json(err);
        });
    }
}

module.exports = UserController;