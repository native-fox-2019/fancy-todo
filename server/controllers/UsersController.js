const { User } = require('../models');
const createError = require('../helpers/createError');
const { compare } = require('../helpers/bcrypt');
const { generateToken } = require('../helpers/jwt');
const {OAuth2Client} = require('google-auth-library');
const client = new OAuth2Client(process.env.CLIENT_ID);

class UsersController {
    static register(req, res, next) {
        let { username, email, password } = req.body;
        User.create({ username, email, password })
            .then(data => {
                res.status(201).json(data);
            }).catch(err => {
                next(err);
            });

    }
    static login(req, res, next) {
        let { email, password } = req.body;
        User.findOne({ where: { email } })
            .then(data => {
                if (!data) {
                    throw createError(404, 'Wrong username / password');
                } else {
                    return compare(password, data.password)
                        .then(result => {
                            if (result) {
                                let payload = { id: data.id, email: data.email };
                                let token = generateToken(payload);
                                res.status(200).json({ token });
                            } else {
                                throw createError(400, 'Wrong username / password');
                            }
                        })
                }
            }).catch(err => {
                next(err);
            });
    }
    static googleLogin(req, res, next) {
        let token = req.body.token;
        let payload = null;
        client.verifyIdToken({
            idToken: token,
            audience: process.env.CLIENT_ID
        })
        .then(data => {
            let ticket = data;
            payload = ticket.getPayload();
            return User.findOne({ where: { email: payload.email } })
        }).then(data => {
            if (!data) {
                User.create({
                    username: payload.given_name + payload.family_name,
                    email: payload.email,
                    password: '12345'
                })
                .then(data => {
                    let newPayload = { id: data.id, email: data.email };
                    let token = generateToken(newPayload);
                    res.status(200).json({ token });
                })
            } else {
                let newPayload = { id: data.id, email: data.email };
                let token = generateToken(newPayload);
                res.status(200).json({ token });
            }
        }).catch(err => {
            next(err);
        });
    }
}

module.exports = UsersController;