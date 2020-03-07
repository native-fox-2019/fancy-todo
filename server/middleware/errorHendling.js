module.exports = (err, req, res, next) => {
    console.log(err)
    if (err.name === 'SequelizeValidationError') {
        const errMsg = err.errors.map(msg => {
            return msg.message
        })
        res.status(400).json({ message: errMsg })
    } else if (err.name === 'SequelizeUniqueConstraintError') {
        res.status(400).json({ message: err.message })
    } else if (err.status === 404) {
        res.status(err.status).json({ message: err.msg })
    } else {
        res.status(500).json({ message: 'Internal server error!' })
    }
}