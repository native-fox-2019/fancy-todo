const {OAuth2Client} = require('google-auth-library');
const client = new OAuth2Client(process.env.GOOGLE_CLIENT_ID);
const { User } = require('../models');
const jwt = require('jsonwebtoken');
const createError = require('http-errors');
const bcrypt = require('bcrypt');
const saltRounds = Number(process.env.BCRYPT_SALTROUNDS);
const axios = require('axios');

class UserController {
    static googleSignIn = (req, res, next) => {
        let email = null;
        client.verifyIdToken({
            idToken: req.body.token,
            audience: process.env.GOOGLE_CLIENT_ID
        })
        .then(ticket => {
            email = ticket.getPayload().email;
            let loginData = {
                email: email
            }
            return User.findOne({ where: loginData })
        })
        .then(data => {
            if (data) {
                return data;
            } else {
                return axios.get(process.env.RANDOM_WORDS)
                .then(randomWords => {
                    console.log(randomWords);
                    return bcrypt.hash(randomWords.data.join(''), saltRounds)
                })
                .then(hash => {
                    console.log(hash);
                    let newUser = {
                        email: email,
                        password: hash
                    };
                    return User.create(newUser)
                })
            }
        })
        .then(data => {
            let token = jwt.sign({ id: data.id, email: data.email }, process.env.AUTH_SECRET);
            res.status(200).json({ token });
        })
        .catch(err => {
            next(err);
        })
    }

    static register = (req, res, next) => {
        let newUser = {
            email: req.body.email
        };
        bcrypt.hash(req.body.password, saltRounds)
        .then(hash => {
            newUser.password = hash;
            return User.create(newUser)
        })
        .then(() => {
            return User.findOne({
                where: {
                    email: newUser.email,
                    password: newUser.password
                }
            });
        })
        .then(data => {
            res.status(201).json(data);
        })
        .catch(err => {
            next(err)
        })
    }

    static login = (req, res, next) => {
        let loginData = {
            email: req.body.email,
        }
        let userData = {}
        User.findOne({ where: loginData })
        .then(data => {
            if (!data) {
                throw createError(400,'InvalidLogin');
            } else {
                userData = {
                    id: data.id,
                    email: data.email
                };
                return bcrypt.compare(req.body.password, data.password)
            }
        })
        .then(result => {
            if (result) {
                let token = jwt.sign(userData, process.env.AUTH_SECRET);
                res.status(200).json({ token });
            } else {
                throw createError(400,'InvalidLogin');
            }
        })
        .catch(err => {
            next(err);
        });
    }
}

module.exports = UserController;