"use strict"
const verifyToken = require('../helpers/verifyToken')
const { User } = require('../models')

const authentication = (req, res, next) => {
    const token = req.headers.token
    try {
        const decoded = verifyToken(token)
        User.findOne({ where: { id: decoded.id } })
            .then(data => {
                if (decoded.id == data.id) {
                    req.user = decoded;
                    next();
                }
            })
            .catch(err => {
                res.status(400).json({ message: "Invalid token" });
            })

    } catch (ex) {
        res.status(400).send({ message: "Invalid token." });
    }


}

module.exports = authentication
