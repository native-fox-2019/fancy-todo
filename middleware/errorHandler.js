module.exports = (err, req, res, next) => {
    if (err.name === `SequelizeValidationError`) {
        var errMsg = {
            message: []
        }
        err.errors.forEach(i => {
            errMsg.message.push(i.message)
        })
        
        res.status(400).json(errMsg)
    } else if (err.code) {
        res.status(404).json(err.msg)
    }
    else {
        res.status(500).json({
            message: `ada yg rusak`
        })
    }
}