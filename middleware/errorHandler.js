module.exports = (err, req, res, next) => {
    console.log(err)
    if (err.status == 404) {
        res.status(404).json(err)
    } else if (err.status == 400) {
        res.status(400).json(err)
    } else {
        res.status(500).json(`Server Error!`)
    }
}