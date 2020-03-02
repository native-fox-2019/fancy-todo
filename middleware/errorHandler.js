module.exports = (err, req, res, next) => {
    if (err.name === `SequelizeValidationError`) {
        let errMsg = {
            resultmessage: []
        }

        err.errors.forEach(element => {
            errMsg.resultmessage.push(element.message)
        });
        res.status(400).json(errMsg)
    } else if (err.code) {
        res.status(404).json(err.msg)
    } else {
        res.status(500).json({
            message: `Something Wrong and Errors`
        })
    }
}