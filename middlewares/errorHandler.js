function errorHandler(err,req,res,next) {
    if(err.name === 'SequelizeValidationError'){
        const message = err.errors.map(el=>el.message)
        res.status(400).json({message})
    } else if (err.status === 404 ) {
        res.status(404).json({err:err.msg})
    } else {
        // console.log(err)
        res.status(500).json({errMessage:'internal server error'})
    }
}

module.exports = errorHandler