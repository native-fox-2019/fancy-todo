module.exports = (err, req, res, next) => {
    if (err.name == `SequelizeValidationError`) {
        let error = []
        err.errors.forEach (i => {
            error.push(i.message)
        })
        res.status(400).json(error)
    } else if (err == `Error: ID cannot be found`) {
        let error = {msg:`ID cannot be found`}
        res.status(404).json(`ID cannot be found`)
    } else {
        res.status(500).json(`Server Error!`)
    }
}