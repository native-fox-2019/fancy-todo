module.exports = (err, req, res, next) => {
    if (err.status == 404) {
        res.status(404).json(err)
    } else if (err.status == 400) {
        res.status(400).json(err)
    } else {
        res.status(500).json('Error Server!')
    }
}