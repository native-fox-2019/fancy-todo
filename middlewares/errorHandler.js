function errorHandler(err, req, res, next){
    if(err.msg === 'error not found'){
        res.status(404).json(err.msg);
    }else if(err.msg === 'wrong password'){
        res.status(400).json(err.msg);
    }else if(err.name === 'SequelizeValidationError'){
        res.status(400).json(err.message);
    }else{
        res.status(500).json(err.message);
    }

}

module.exports = errorHandler;