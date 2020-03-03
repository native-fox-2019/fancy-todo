"use strict"

function errorhandler(err, req, res, next) {
    if (err.name === 'JsonWebTokenError') {
        res.status(400).json({
            status: 400,
            message: 'Authentication error'
        })
    } else if (err) {
        res.status(400).json({
            status: 400,
            message: err.name
        })
    } else {
        res.status(500).json({
            status: 400,
            message: err.name
        })
    }
}

module.exports = errorhandler