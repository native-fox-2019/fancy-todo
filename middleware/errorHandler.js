module.exports = (err, req, res, next) => {
    if (err.name === `SequelizeValidationError`) {
        var errMsg = {
            message: []
        }
        err.errors.forEach(i => {
            errMsg.message.push(i.message)
        })
        
        res.status(400).json(errMsg)
    } else if (err.name === `NotFoundError`) {
        res.status(404).json(err)
    } else if (err.name === `BadRequestError`) {
        res.status(400).json(err)
    } else {
        console.log(err.stack)
        res.status(500).json({
            message: `Internal Server Error`
        })
    }
}