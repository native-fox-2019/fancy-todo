const errorHandler = (err, req, res, next) => {
    if (err.status === 403) {
        res.status(403).json(err)
    } else if (err.status === 400) {
        res.status(400).json(err)
    } else if (err.status === 404) {
        res.status(404).json(err)
    }
    res.status(500).json(err)
}

module.exports = errorHandler