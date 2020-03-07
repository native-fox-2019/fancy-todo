module.exports = (err, req, res, next) => {
    var status_code = 500
    var status_message = [`Internal Server Error`]

    switch (err.name) {
        case `SequelizeValidationError`:
            var errMsg = []

            err.errors.forEach(i => {
                errMsg.push(i.message)
            })

            status_code = 400
            status_message = errMsg
            break;

        case `ForbiddenError`:
            status_code = 403
            status_message = [err.message]
            break;

        case `NotFoundError`:
            status_code = 404
            status_message = [err.message]
            break;

        case `BadRequestError`:
            status_code = 400
            status_message = [err.message]
            break;

        case `JsonWebTokenError`:
            status_code = 401
            status_message = [`Invalid Token`]
            break;
    }

    status_code === 500 && console.log(err.stack)

    res.status(status_code).json({
        status_code,
        status_message
    })
}