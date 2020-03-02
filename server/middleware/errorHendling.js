module.exports = (err, req, res, next) => {
    if (err.name === 'SequelizeValidationError') {
        const errMsg = err.errors.map(msg => {
            return msg.message
        })
        res.status(401).json({ message: errMsg })
    } else if (err.status === 404) {
        res.status(err.status).json({ message: err.msg })
    } else {
        res.status(500).json({ message: 'Internal server error!' })
    }
}