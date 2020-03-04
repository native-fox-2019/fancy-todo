function errorHandler(err, req, res, next) {
    // console.log(err.name);
    // res.json(err);
    let errMsg = {};
    if (err.name === 'SequelizeValidationError') {
        errMsg.status = 400;
        errMsg.message = [];
        err.errors.forEach(e => {
            errMsg.message.push(e.message);
        });
    } else if (err.name === 'SequelizeDatabaseError') {
        errMsg.status = 500;
        errMsg.message = 'Internal Server Error';
    } else if (err.name === 'BadRequestError' && err.message === 'InvalidLogin') {
        errMsg.status = 400;
        errMsg.message = 'Wrong Email / Password';
    } else if (err.name === 'NotFoundError' && err.message === 'ItemNotFound') {
        errMsg.status = 404;
        errMsg.message = 'Specified todo item not found';
    } else if (err.name === 'ForbiddenError' && err.message === 'ItemNotOwned') {
        errMsg.status = 403;
        errMsg.message = 'Specified todo item not yours';
    } else {
        res.status(500).json(err);
    }
    res.status(errMsg.status).json(errMsg);
}
module.exports = errorHandler;