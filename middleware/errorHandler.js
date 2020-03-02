module.exports = (err, req, res, next) => {
    console.log(err)
    if (err.name == `SequelizeValidationError`) {
        let error = []
        err.errors.forEach (i => {
            error.push(i.message)
        })
        res.status(400).json(error)
    } else if (err == `ID cannot be found`) {
        res.status(404).json(err)
    } else {
        res.status(500).json(`Server Error!`)
    }
}