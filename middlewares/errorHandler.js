const errorHandler = (err, req, res, next) => {
    if (err.name) {
        res.status(400).json(err)
        next()
    }
    res.status(500).json(err)
}

module.exports = errorHandler