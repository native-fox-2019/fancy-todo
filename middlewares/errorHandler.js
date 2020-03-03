function errorHandler(err, req, res, next) {
    // console.log(err)
    if (err.name === 'SequelizeValidationError') {
        console.log('ini handle error 400')
        res.status(400).json(err.errors)
    } else if (err.msg === 'id not found !') {
        console.log('ini handle error 404')
        let error = err.msg
        res.status(404).json(error)
    } else {
        console.log('ini handle error 500')
        res.status(500).json(err)
    }
}

module.exports = errorHandler