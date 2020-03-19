module.exports = (err, req, res, next) => {
    switch (err.name) {
        case `SequelizeValidationError`:
            let errorMessage = []

            err.errors.forEach(element => {
                errorMessage.push(element.message)
            })

            status_code = 400
            status_message = errorMessage
            break;

        case "NotFoundError":
            status_code = 404
            status_message = err
            break;

        case "BadRequestError":
            status_code = 400
            status_message = err
            break;

        case "JsonWebTokenError":
            status_code = 400
            status_message = "Invalid Token"
            break;
        case "SequelizeUniqueConstraintError":
            status_code=400
            status_message= "Email already exist"
            break;
    }
    let status_code = 500
    let status_message = "Internal Server Error"
    status_code === 500 && console.log(err.stack)
    res.status(status_code).json({
        status_code, status_message
    })
}