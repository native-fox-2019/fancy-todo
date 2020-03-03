const jwt = require('jsonwebtoken')

module.exports = (data) => {
    let token = jwt.sign({
        id: data.id,
        name: data.name,
        email: data.email
    }, process.env.JWT_SECRET)

    return token
}