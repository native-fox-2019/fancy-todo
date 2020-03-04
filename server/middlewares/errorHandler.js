function errorHandler(err, req, res, next) {
    // console.log(err)
    if (err.name === 'SequelizeValidationError') {
        res.status(400).json(err.errors)
    } else if(err.status === 400){
        res.status(err.status).json({message :`${err.resource} bad request`})
    }else if(err.status === 404){
        res.status(err.status).json({message :`${err.resource} not found`})
    } else if (err.status === 403) {
        res.status(err.status).json({message: `${err.resource} forbidden`})
    } else {
        res.status(500).json(err)
    }
}

module.exports = errorHandler