const { verifyToken } = require('../helpers/jwt');
const { User } = require('../models');
const createError = require('../helpers/createError');

function authentication (req, res, next) {
    let { token } = req.headers;
    try {
        let decoded = verifyToken(token);
        req.userData = decoded;
        User.findOne({ where: { id: req.userData.id } })
            .then(data => {
                if (!data) {
                    next(createError(404, 'Error Not Found'));
                } else {
                    next();
                }
            }).catch(err => {
                next(err);
            });
    } catch (err) {
        next(err);
    }
}

module.exports = authentication;