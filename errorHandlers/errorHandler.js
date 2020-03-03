module.exports = (err, request, response, next) => {
    response.status(400).json(err)
}