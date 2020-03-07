module.exports = (err, request, response, next) => {
    if(err.status_code){
        response.status(err.status_code).json(err)
    }else if (err.name == 'SequelizeValidationError'){
        let err_msg = []
        err.errors.forEach(element => {
            err_msg.push(element.message)
        });
        response.status(400).json({
            status_code: 400,
            message: err_msg
        })
    }else{
        response.status(500).json({
            status_code: 500,
            message: 'System Error',
            err
        })
    }
}
