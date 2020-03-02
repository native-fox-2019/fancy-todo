module.exports = (err, req, res, next) => {
    if (err.name === 'SequelizeValidationError') {
        let error = [];
        err.errors.forEach(x => {
            error.push(x.message);
        });
        res.status(400).json(error);
    } else if (err.name === 'SequelizeDatabaseError') {
        res.status(500).json({
            msg: 'Server Error'
        })
    } else {
        console.log(err);
        res.status(500).json({
            msg: 'Server Error'
        })
    }
}