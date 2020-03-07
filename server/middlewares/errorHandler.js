"use strict"

function errorhandler(err, req, res, next) {
    
    console.log('ERROR HANDLER')
    console.log(err)

    let number = err.status || 500

    switch (err.name) {
        case ('JsonWebTokenError'):
            res.status(400).json({
                status: 400,
                message: 'Authentication error'
            })
            break
        case ('SequelizeValidationError'):
            res.status(400).json({
                status: 400,
                message: err.errors.message
            })
            break
        case ('CastError'):
            res.status(404).json({
                status: 404,
                message: 'Data not found'
            })
            break
        default:
            res.status(number).json({
                status: err.status || 500,
                message: err.message
            })
            break
    }
}

module.exports = errorhandler