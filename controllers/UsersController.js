const { User } = require('../models');
const createError = require('../helpers/createError');
const { compare } = require('../helpers/bcrypt');
const { generateToken } = require('../helpers/jwt');

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
    static find(req, res, next) {

    }

}

module.exports = UsersController;